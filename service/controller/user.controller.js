import dayjs from "dayjs"
import blogsDAO from "../dao/blog.dao.js"
import relationshipDAO from "../dao/relationship.dao.js"
import tokenDAO from "../dao/token.dao.js"
import usersDAO from "../dao/user.dao.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../model/user.model.js"
import Token from "../model/token.model.js"
import { formatBlogs } from "../utils/formatData.js"
import savedDAO from "../dao/saved.dao.js"


export default class userController {
    static async createUser(req, res, next) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const defaultAvatar = "https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg"

        const fileUrl = req.files?.[0]?.filename
            ? `${req.protocol}://${req.get("host")}/assets/userAvatars/${req.files[0].filename}`
            : defaultAvatar

        const emailDomain = req.body.email.split("@")[1]
        const role = emailDomain === "blogs.com" ? "admin" : "general"

        try {
            const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: role,
                avatar: fileUrl
            })
            await usersDAO.createUser(data)
            next()
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body
            const existingUser = await usersDAO.signIn(email)
            
            if (!existingUser)
                return res.status(400).json({
                    message: "Invalid Email",
                })
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect)
                return res.status(400).json({
                    message: "Invalid Password",
                })
            const payload = {
                id: existingUser._id,
                email: existingUser.email,
            }
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: "6h",
            })
            const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
                expiresIn: "7d",
            })
            const newRefreshToken = new Token({
                user: existingUser._id,
                refreshToken: refreshToken,
                token: token
            })
            await tokenDAO.createToken(newRefreshToken)
            const savedBlog = await savedDAO.findListSaved(existingUser._id)

            res.status(200).json({
                token,
                refreshToken,
                tokenUpdatedAt: new Date().toLocaleString(),
                user: {
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    role: existingUser.role,
                    avatar: existingUser.avatar,
                    saveBlog: savedBlog
                },
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async logout(req, res) {
        const token = req.headers.authorization?.split(" ")[1] ?? null
        try {
            if (token)
                await tokenDAO.deleteTokenByAccess(token)
            res.status(200).json({ message: "Logout successful" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body

            const existingToken = await tokenDAO.getToken(refreshToken)
            if (!existingToken) {
                return res.status(401).json({
                    message: "Invalid refresh token",
                })
            }

            const existingUser = await usersDAO.getUserById(existingToken.user._id)
            if (!existingUser) {
                return res.status(401).json({
                    message: "Invalid refresh token",
                })
            }

            const refreshTokenExpiresAt = jwt.decode(existingToken.refreshToken).exp * 1000
            if (Date.now() >= refreshTokenExpiresAt) {
                await tokenDAO.deleteTokenByRefresh(refreshToken)
                return res.status(401).json({
                    message: "Expired refresh token",
                })
            }

            const payload = {
                id: existingUser._id,
                email: existingUser.email,
            };

            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: "6h",
            });

            res.status(200).json({
                token,
                refreshToken: existingToken.refreshToken,
                tokenUpdatedAt: new Date().toLocaleString(),
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async getPublicUser(req, res) {
        try {
            const currentUserId = req.userId
            const id = req.params.id

            const user = await usersDAO.getUserSecurity(id)

            if (!user)
                return res.status(404).json({ message: "User not found" })

            const totalBlogs = await blogsDAO.countBlogs(user._id)

            const isFollowing = await relationshipDAO.exists(currentUserId, user._id)

            const followingSince = isFollowing
                ? dayjs(isFollowing.createdAt).format("MMM D, YYYY")
                : null

            const last30Days = dayjs().subtract(30, "day").toDate()
            const blogsLast30Days = await blogsDAO.getBlogById(user._id, last30Days)
            const formattedBlogs = formatBlogs(blogsLast30Days, currentUserId)

            const photos = blogsLast30Days.map(item => item.fileUrl)

            const responseData = {
                name: user.name,
                avatar: user.avatar,
                role: user.role,
                interests: user.interests,
                totalBlogs,
                photos: photos,
                createdAt: dayjs(user.createdAt).format("MMM D, YYYY"),
                totalFollowers: user.followers?.length,
                totalFollowing: user.following?.length,
                isFollowing: !!isFollowing,
                followingSince,
                blogsLast30Days: formattedBlogs,
            }

            res.status(200).json(responseData)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    
}