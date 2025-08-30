import express from 'express'
import usersController from '../controller/user.controller.js'
import { sendVerificationEmail, verifyEmail } from '../middlewares/users/verifyEmail.js'
import passport from 'passport'
import { decodeToken } from '../middlewares/auth/decodeToken.js'
import relationshipController from '../controller/relationship.controller.js'
import '../config/passport.js'
import { avatarUpload } from '../middlewares/users/avatarUpload.js'


const router = express.Router()
const requireAuth = passport.authenticate("jwt", { session: false }, null)

router.route("/signup").post(avatarUpload, usersController.createUser, sendVerificationEmail)

router.get("/auth/verify", verifyEmail)

router.post("/signin", usersController.signin)

router.post("/logout", usersController.logout)

router.post("/refresh-token", usersController.refreshToken)

router.get("/profile/:id", requireAuth, decodeToken, usersController.getPublicUser)

router.patch("/:id/follow", requireAuth, decodeToken, relationshipController.followUser)

router.patch("/:id/unfollow", requireAuth, decodeToken, relationshipController.unfollowUser)

export default router