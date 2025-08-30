import { ObjectId } from "mongodb"

let commentsCollection

export default class commentsDAO {
    static async injectDB(conn) {
        if (commentsCollection)
            return
        try {
            commentsCollection = await conn.db(process.env.DATABASE_NAME).collection("comments")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async createComment(comment) {
        try {
            const result = await commentsCollection.insertOne(comment)
            return result.insertedId
        } catch (e) {
            throw new Error("Error Create Comments: " + e)
        }
    }

    static async deleteComments(comments) {
        try {
            return await deleteMany({ _id: { $in: comments.map((id) => new ObjectId(id)) }})
        } catch (e) {
            throw new Error("Error Delele Comments: " + e)
        }
    }

    static async findCommentById(id) {
        try {
            return await commentsCollection.aggregate([
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
            throw new Error("Error Find Comments: " + e)
        }
    }
}