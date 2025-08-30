import express from 'express'
import blogsController from '../controller/blog.controller.js'
import commentsController from '../controller/comment.controller.js'
import reactionController from '../controller/reaction.controller.js'
import { fileUpload } from '../middlewares/post/fileUpload.js'
import { decodeToken } from '../middlewares/auth/decodeToken.js'
import passport from 'passport'

const router = express.Router()
const requireAuth = passport.authenticate("jwt", { session: false }, null)
router.use(requireAuth, decodeToken)

router.route("/create").post(fileUpload, blogsController.createBlog)

router.get("/", blogsController.getBlogs)

router.get("/:id", blogsController.getBlogById)

router.post("/:id/save-or-unsave", blogsController.saveOrUnSaveBlogs) 

router.get("/saved", blogsController.getSavedBlogs)

router.delete("/:id", blogsController.deleteBlog)

router.post("/:id/comment", commentsController.addComment)

router.post("/:id/reaction", reactionController.addReaction)

router.delete("/:id/unreaction", reactionController.removeReation)

export default router