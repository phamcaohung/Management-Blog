import blogsDAO from "../dao/blog.dao.js";
import commentsDAO from "../dao/comment.dao.js";
import { ObjectId } from "mongodb"
import Comment from "../model/comment.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import relativeTime from "dayjs/plugin/relativeTime.js"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)


export default class commentController {
    static async addComment(req, res) {
        try {
            const { content, blogId } = req.body
            const userId = req.userId
            const data = new Comment({
                user: new ObjectId(userId),
                blog: new ObjectId(blogId),
                content: content
            })
            const commentId = await commentsDAO.createComment(data)
            await blogsDAO.addCommentToBlog(blogId, commentId)

            const comment = await commentsDAO.findCommentById(commentId)

            const result = {
                ...comment,
                createdAt: dayjs(comment.createdAt).fromNow()
            }

            res.status(200).json(result)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}