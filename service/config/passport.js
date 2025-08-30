import dotenv from "dotenv"
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import usersDAO from "../dao/user.dao.js";
import tokenDAO from "../dao/token.dao.js";
import jwt from 'jsonwebtoken'


dotenv.config()

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}

passport.use(
    new Strategy(opt, async (jwt_payload, done) => {
        try {
            const user = await usersDAO.findByEmail(jwt_payload.email)
            if(user) {
                const refreshTokenFromDB = await tokenDAO.findByUser(user._id)
                if(!refreshTokenFromDB)
                    return done(null, false) 

                const refreshPayload = jwt.verify(
                    refreshTokenFromDB.refreshToken,
                    process.env.REFRESH_SECRET
                )
                if(refreshPayload.email !== jwt_payload.email)
                    return done(null, false)

                const tokenExpiration = new Date(jwt_payload.exp * 1000)
                const now = new Date()
                const timeDifference = tokenExpiration.getTime() - now.getTime()
                if (timeDifference > 0 && timeDifference < 30 * 60 * 1000) {
                    const payloadNew = {
                        _id: user._id,
                        email: user.email,
                    }
                    const newToken = jwt.sign(payloadNew, process.env.SECRET, {
                        expiresIn: "6h",
                    })

                    return done(null, { user, newToken })
                }
                return done(null, { user })
            }
            else
                return done(null, false)
        } catch (e) {
            return done(e, false)
        }
    })
)