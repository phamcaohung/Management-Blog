import { ObjectId } from "mongodb"

let reactionsCollection

export default class reactionsDAO {
    static async injectDB(conn) {
        if (reactionsCollection)
            return
        try {
            reactionsCollection = await conn.db(process.env.DATABASE_NAME).collection("reactions")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async createReaction(data) {
        try {
            const result = await reactionsCollection.insertOne(data)
            return result.insertedId
        } catch (e) {
            throw new Error("Error Create Reaction: " + e)
        }
    }

    static async removeReation(data) {
        try {
            const result = await reactionsCollection.findOneAndDelete(data)
            return result._id
        } catch (e) {
            throw new Error("Error Remove Reaction: " + e)
        }
    }

    static async findReactionById(id) {
        try {
            return await reactionsCollection.aggregate([
                { $match: { _id: new ObjectId(id) } },
                {
                    $lookup: {
                        from: "users",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        content: 1,
                        blog: 1,
                        updatedAt: 1,
                        createdAt: 1,
                        "user.name": 1,
                        "user.avatar": 1
                    }
                }
            ]).next()
        } catch (e) {
            throw new Error("Error Find Reaction: " + e)
        }
    }
}