import { ObjectId } from "mongodb"
import blogsDAO from "../dao/blog.dao.js"
import reactionsDAO from "../dao/reaction.dao.js"
import Reaction from "../model/reaction.model.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import advancedFormat from "dayjs/plugin/advancedFormat.js";

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

export default class reactionController {
    static async addReaction(req, res) {
        try {
            const { reaction, blogId } = req.body
            const userId = req.userId
            const data = new Reaction({
                user: new ObjectId(userId),
                blog: new ObjectId(blogId),
                reaction: reaction
            })
            const reactionId = await reactionsDAO.createReaction(data)
            await blogsDAO.addReactionToBlog(blogId, reactionId)
            
            const result = await reactionsDAO.findReactionById(reactionId)
            
            res.status(200).json(result)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async removeReation(req, res) {
        try {
            const { blogId } = req.body
            const userId = req.userId
            const data = {
                blog: new ObjectId(blogId),
                user: new ObjectId(userId)
            }
            const reactionId = await reactionsDAO.removeReation(data)

            if(reactionId)
                await blogsDAO.removeReactionFromBlog(blogId, reactionId)

            const blog = await blogsDAO.findById(blogId)
            const formattedBlogs = {
                ...blog,
                createdAt: dayjs(blog.createdAt).fromNow()
            }
            
            res.status(200).json(formattedBlogs)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}