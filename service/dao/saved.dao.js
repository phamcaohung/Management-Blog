import { ObjectId } from "mongodb"

let savedCollection

export default class savedDAO {
    static async injectDB(conn) {
        if (savedCollection)
            return
        try {
            savedCollection = await conn.db(process.env.DATABASE_NAME).collection("saved")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async savedBlog(data) {
        try {
            const result = await savedCollection.insertOne(data)
            return result.insertedId
        } catch (e) {
            throw new Error("Error Save Blog: " + e)
        }
    }

    static async unSavedBlog(data) {
        try {
            const result = await savedCollection.findOneAndDelete(data)
            return result._id
        } catch (e) {
            throw new Error("Error UnSave Blog: " + e)
        }
    }

    static async findListSaved(userId) {
        try {
            return await savedCollection.aggregate([
                { $match: { user: new ObjectId(userId) } },
                {
                    $lookup: {
                        from: "blogs",
                        localField: "blog",
                        foreignField: "_id",
                        as: "blog"
                    }
                },
                {
                    $unwind: {
                        path: "$blog",
                        preserveNullAndEmptyArrays: true
                    }
                },
                { 
                    $project: { 
                        _id: 1,
                        createdAt: 1,
                        "blog._id": 1
                    } 
                }
            ]).toArray()
        } catch (e) {
            throw new Error("Error Find List Save Blog: " + e)
        }
    }
}