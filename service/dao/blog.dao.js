import { ObjectId } from "mongodb"

let blogsCollection

export default class blogsDAO {
    static async injectDB(conn) {
        if (blogsCollection)
            return
        try {
            blogsCollection = await conn.db(process.env.DATABASE_NAME).collection("blogs")
            await blogsCollection.createIndex({ content: "text" })
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async createBlog(data) {
        try {
            const result = await blogsCollection.insertOne(data)
            return result.insertedId
        } catch (e) {
            throw new Error("Error Create Blogs: " + e)
        }
    }

    static async findById(id) {
        try {
            const result = await blogsCollection.aggregate([
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
                    $lookup: {
                        from: "comments",
                        localField: "comments",
                        foreignField: "_id",
                        as: "comments",
                    }
                },
                {
                    $lookup: {
                        from: "reactions",
                        localField: "reactions",
                        foreignField: "_id",
                        as: "reactions",
                    }
                },
                {
                    $project: {
                        content: 1,
                        fileUrl: 1,
                        fileType: 1,
                        comments: 1,
                        reactions: 1,
                        createdAt: 1,
                        "user.name": 1,
                        "user.avatar": 1
                    }
                }
            ]).toArray()
            return result[0] || null
        } catch (e) {
            throw new Error("Error Get Blogs: " + e)
        }
    }

    static async getBlogsLast30Days(userId, last30Days) {
        try {
            const data = [
                {
                    $match: {
                        user: new ObjectId(userId),
                        createdAt: { $gte: last30Days }
                    }
                },
                { $count: "total" }
            ]
            return await blogsCollection.aggregate(data).toArray()
        } catch (e) {
            throw new Error("Error Get Blogs: " + e)
        }
    }

    static async countBlogs(id) {
        try {
            return await blogsCollection.countDocuments({ user: new ObjectId(id) })
        } catch (e) {
            throw new Error("Error Count Blogs: " + e)
        }
    }

    static async deleteBlogById(id) {
        try {
            return await blogsCollection.deleteOne({ _id: id })
        } catch (e) {
            throw new Error("Error Delete Blogs: " + e)
        }
    }

    static async getBlogs(skip, limit) {
        try {
            return await blogsCollection.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: parseInt(skip) },
                { $limit: parseInt(limit) },
                //users
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
                //comments
                {
                    $lookup: {
                        from: "comments",
                        localField: "comments",
                        foreignField: "_id",
                        as: "comments",
                        pipeline: [
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
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                }
                            }
                        ]
                    }
                },
                //reactions
                {
                    $lookup: {
                        from: "reactions",
                        localField: "reactions",
                        foreignField: "_id",
                        as: "reactions",
                        pipeline: [
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
                                    reaction: 1,
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                    "user._id": 1
                                }
                            }
                        ]
                    }
                },
                //blogs
                {
                    $project: {
                        content: 1,
                        fileUrl: 1,
                        fileType: 1,
                        comments: 1,
                        reactions: 1,
                        createdAt: 1,
                        "user.name": 1,
                        "user.avatar": 1,
                        "user._id": 1,
                    }
                }
            ]).toArray()
        } catch (e) {
            throw new Error("Error Get Blogs: " + e)
        }
    }

    static async getBlogById(userId, last30Days) {
        try {
            return await blogsCollection.aggregate([
                {
                    $match: {
                        user: new ObjectId(userId),
                        createdAt: { $gte: last30Days }
                    }
                },
                //users
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
                //comments
                {
                    $lookup: {
                        from: "comments",
                        localField: "comments",
                        foreignField: "_id",
                        as: "comments",
                        pipeline: [
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
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                }
                            }
                        ]
                    }
                },
                //reactions
                {
                    $lookup: {
                        from: "reactions",
                        localField: "reactions",
                        foreignField: "_id",
                        as: "reactions",
                        pipeline: [
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
                                    reaction: 1,
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                    "user._id": 1
                                }
                            }
                        ]
                    }
                },
                //blogs
                {
                    $project: {
                        content: 1,
                        fileUrl: 1,
                        fileType: 1,
                        comments: 1,
                        reactions: 1,
                        createdAt: 1,
                        "user.name": 1,
                        "user.avatar": 1,
                        "user._id": 1
                    }
                }
            ]).toArray()
        } catch (e) {
            throw new Error("Error Get Blogs: " + e)
        }
    }

    static async findSaveBlog(user) {
        try {
            return await blogsCollection.aggregate([
                { $match: { _id: { $in: user.savedPosts.map(id => new ObjectId(id)) } } },
                //users
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
                //comments
                {
                    $lookup: {
                        from: "comments",
                        localField: "comments",
                        foreignField: "_id",
                        as: "comments",
                        pipeline: [
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
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                }
                            }
                        ]
                    }
                },
                //reactions
                {
                    $lookup: {
                        from: "reactions",
                        localField: "reactions",
                        foreignField: "_id",
                        as: "reactions",
                        pipeline: [
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
                                    reaction: 1,
                                    createdAt: 1,
                                    "user.name": 1,
                                    "user.avatar": 1,
                                    "user._id": 1
                                }
                            }
                        ]
                    }
                },
                //blogs
                {
                    $project: {
                        content: 1,
                        fileUrl: 1,
                        fileType: 1,
                        comments: 1,
                        reactions: 1,
                        createdAt: 1,
                        "user.name": 1,
                        "user.avatar": 1,
                        "user._id": 1,
                    }
                }
            ]).toArray()
        } catch (e) {
            throw new Error("Error Save Blogs: " + e)
        }
    }

    static async addCommentToBlog(blogId, commentId) {
        try {
            return await blogsCollection.findOneAndUpdate(
                { _id: new ObjectId(blogId) },
                { $addToSet: { comments: new ObjectId(commentId) } }
            )
        } catch (e) {
            throw new Error("Error Add Comment To Blog: " + e)
        }
    }

    static async addReactionToBlog(blogId, reactionId) {
        try {
            return await blogsCollection.findOneAndUpdate(
                { _id: new ObjectId(blogId) },
                { $addToSet: { reactions: new ObjectId(reactionId) } },
                { returnDocument: "after" }
            )
        } catch (e) {
            throw new Error("Error Add Reaction To Blog: " + e)
        }
    }

    static async removeReactionFromBlog(blogId, reactionId) {
        try {
            return await blogsCollection.updateOne(
                { _id: new ObjectId(blogId) },
                { $pull: { reactions: new ObjectId(reactionId) } }
            )
        } catch (e) {
            throw new Error("Error Remove Reaction To Blog: " + e)
        }
    }

}