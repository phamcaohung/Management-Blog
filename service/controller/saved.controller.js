import { ObjectId } from "mongodb"
import Saved from "../model/saved.model.js"
import usersDAO from "../dao/user.dao.js"
import savedDAO from "../dao/saved.dao.js"


export default class savedController {
    static async saveBlogs(req, res) {
        try {
            const blogId = req.params.id
            const userId = req.userId
            const saved = new Saved({
                user: new ObjectId(userId),
                blog: new ObjectId(blogId)
            })
            
            const savedId = await savedDAO.savedBlog(saved)
            await usersDAO.addSavedBlogToUser(savedId, userId) 

            const listSaved = await savedDAO.findListSaved(userId)
            
            res.status(200).json(listSaved)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async unSaveBlogs(req, res) {
        try {
            const blogId = req.params.id
            const userId = req.userId
            const saved = {
                user: new ObjectId(userId),
                blog: new ObjectId(blogId)
            }
            
            const savedId = await savedDAO.unSavedBlog(saved)
            console.log("savedId: ", savedId);
            await usersDAO.removeSavedBlogFromUser(savedId, userId) 

            const listSaved = await savedDAO.findListSaved(userId)
            
            res.status(200).json(listSaved)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}