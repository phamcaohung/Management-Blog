import dayjs from "dayjs";
import blogsDAO from "../dao/blog.dao.js";
import path from 'path'
import fs from "fs";
import commentsDAO from "../dao/comment.dao.js";
import usersDAO from "../dao/user.dao.js";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import relativeTime from "dayjs/plugin/relativeTime.js"
import { ObjectId } from "mongodb"
import Blog from "../model/blog.model.js";
import { formatBlogs } from "../utils/formatData.js";
import { log } from "console";


dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

export default class blogController {
    static async createBlog(req, res) {
        try {
            const { content } = req.body
            const { userId, fileUrl, fileType } = req

            const newBlog = new Blog({
                content: content,
                fileUrl: fileUrl ? fileUrl : null,
                fileType: fileType ? fileType : null,
                user: new ObjectId(userId)
            })

            const blogId = await blogsDAO.createBlog(newBlog)
        
            const blog = await blogsDAO.findById(blogId)

            blog.createdAt = dayjs(blog.createdAt).fromNow()

            res.json(blog)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async deleteBlog(req, res) {
        try {
            const id = req.params.id;
            const blog = await blogsDAO.findById(id);

            if (!blog)
                return res.status(404).json({
                    message: "Blog not found. It may have been deleted already"
                })

            if (blog.fileUrl) {
                const filename = path.basename(blog.fileUrl)
                const filePath = path.join(__dirname, "../assets/userFiles", filename)
                try {
                    await fs.unlink(filePath)
                } catch (e) {
                    res.status(404).json({ message: "Blog not found. It may have been deleted already" })
                }
            }

            if (blog.comments && blog.comments.length > 0)
                await commentsDAO.deleteComments(blog.comments)

            await usersDAO.deleteSaveBlog(blog_id)

            await blogsDAO.deleteBlogById(blog_id)

            res.status(200).json({ message: "Blog deleted successfully" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async getBlogs(req, res) {
        try {
            const userId = req.userId;
            const { limit = 10, skip = 0 } = req.query

            const blogs = await blogsDAO.getBlogs(skip, limit)

            const formattedBlogs = formatBlogs(blogs, userId)

            const totalBlogs = await blogsDAO.countBlogs(userId)

            res.status(200).json({
                formattedBlogs,
                totalBlogs,
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async getBlogById(req, res) {
        try {
            const blogId = req.params.id

            const blog = await blogsDAO.findById(blogId)
            if (!blog) {
                return res.status(404).json({ message: "Blog not found" });
            }

            blog.comments = formatComments(blog.comments)
            blog.dateTime = dayjs(blog.createdAt).tz("Asia/Ho_Chi_Minh").format("MMMM Do, YYYY h:mm A")
            blog.createdAt = dayjs(blog.createdAt).fromNow()

            res.status(200).json(blog)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async getSavedBlogs(req, res) {
        try {
            const userId = req.userId
            const user = await usersDAO.getUserById(userId)

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                })
            }

            const saveBlog = await blogsDAO.findSaveBlog(user)
            console.log("saveBlog: ", saveBlog);

            const formattedBlogs = formatBlogs(saveBlog)

            res.status(200).json(formattedBlogs)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async saveOrUnSaveBlogs(req, res) {
        try {
            const blogId = req.params.id
            const userId = req.userId
            const { type } = req.body
            
            const update = {}
            update[type === "save" ? "$addToSet" : "$pull"] = {
                saveBlog: new ObjectId(blogId)
            }
            const user = await usersDAO.updateSaveBlog(userId, update)

            const saveBlog = user.saveBlog
            console.log("saveBlog: ", saveBlog);
            
            res.status(200).json(saveBlog)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}

const formatComments = (comments) =>
    comments.map((comment) => ({
        ...comment,
        createdAt: dayjs(comment.createdAt).fromNow(),
}))
