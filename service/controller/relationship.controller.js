import relationshipDAO from "../dao/relationship.dao.js"
import usersDAO from "../dao/user.dao.js"


export default class relationshipController {
    static async followUser(req, res) {
        try {
            const followerId = req.userId
            const followingId = req.params.id

            const relationshipExists = await relationshipDAO.exists(followerId, followingId)

            if (relationshipExists) 
                return res.status(400).json({
                    message: "Already following this user",
                })
            

            await Promise.all([
                usersDAO.followingById(followingId, followerId),
                usersDAO.followerById(followerId, followingId)
            ])

            await relationshipDAO.create(followerId, followingId)

            res.status(200).json({
                message: "User followed successfully",
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async unfollowUser(req, res) {
        try {
            const followerId = req.userId;

            const followingId = req.params.id;

            const relationshipExists = await relationshipDAO.exists(followerId, followingId)

            if (!relationshipExists) 
                return res.status(400).json({
                    message: "Relationship does not exist",
                })
            
            await Promise.all([
                usersDAO.unfollowingById(followingId, followerId),
                usersDAO.unfollowerById(followerId, followingId)
            ])

            await relationshipDAO.delete(followerId, followingId)

            res.status(200).json({
                message: "User unfollowed successfully",
            })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}