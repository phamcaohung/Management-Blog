import { ObjectId } from "mongodb"

let usersCollection

export default class usersDAO {
    static async injectDB(conn) {
        if (usersCollection)
            return
        try {
            usersCollection = await conn.db(process.env.DATABASE_NAME).collection("users")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async createUser(data) {
        try {
            const result = await usersCollection.insertOne(data)
            return result
        } catch (e) {
            throw new Error("Error creating user: " + e)
        }
    }

    static async signIn(email) {
        try {
            const result = await usersCollection.findOne({ email: email })
            return result
        } catch (e) {
            throw new Error("Error signIn user: " + e)
        }
    }

    static async getUserById(id) {
        return await usersCollection.findOne({ _id: new ObjectId(id) })
    }

    static async followingById(followerId, followingId) {
        try {
            await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(followingId) },
                { $addToSet: { followers: new ObjectId(followerId) } },
            )
        } catch (e) {
            throw new Error("Error Following By Id: " + e)
        }
    }

    static async followerById(followerId, followingId) {
        try {
            await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(followerId) },
                { $addToSet: { following: new ObjectId(followingId) } },
            )
        } catch (e) {
            throw new Error("Error Follower By Id: " + e)
        }
    }

    static async unfollowingById(followerId, followingId) {
        try {
            await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(followingId) },
                { $pull: { followers: new ObjectId(followerId) } },
            )
        } catch (e) {
            throw new Error("Error Unfollowing By Id: " + e)
        }
    }

    static async unfollowerById(followerId, followingId) {
        try {
            await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(followerId) },
                { $pull: { following: new ObjectId(followingId) } },
            )
        } catch (e) {
            throw new Error("Error Unfollower By Id: " + e)
        }
    }

    static async getUserSecurity(id) {
        try {
            const user = await usersCollection.findOne(
                { _id: new ObjectId(id) },
                {
                    projection: {
                        password: 0,
                        email: 0,
                        updatedAt: 0
                    }
                }
            )
            return user
        } catch (e) {
            throw new Error("Error Getting User: " + e)
        }
    }

    static async findByEmail(email) {
        try {
            return await usersCollection.findOne({ email: email })
        } catch (e) {
            throw new Error("Error Getting User By Email: " + e)
        }
    }

    static async deleteSaveBlog(id) {
        try {
            return await usersCollection.updateMany(
                { saveBlog: id },
                { $pull: { saveBlog: id } }
            )
        } catch (e) {
            throw new Error("Error Delete Save Blog: " + e)
        }
    }

    static async findUserVerified(email) {
        try {
            return await usersCollection.findOne({ email: email, isEmailVerified: true })
        } catch (e) {
            throw new Error("Error Find User Verified: " + e)
        }
    }

    static async updateIsEmailVerified(email) {
        try {
            return await usersCollection.findOneAndUpdate(
                { email: email },
                { $set: { isEmailVerified: true } },
            )
        } catch (e) {
            throw new Error("Error Update IsEmailVerified: " + e)
        }
    }

    static async updateSaveBlog(userId, update) {
        try {
            return await usersCollection.findOneAndUpdate(
                { _id: new ObjectId(userId) },
                update,
            )
        } catch (e) {
            throw new Error("Error Update Save Blog: " + e)
        }
    }

    static async findSavedBlogByUser(userId) {
        try {
            return await usersCollection.findOne([
                { $match: { _id: new ObjectId(userId) } },
                { $sort: { createdAt: -1 } },
                {
                    $project: {
                        saveBlog: 1
                    }
                }
            ])
        } catch (e) {
            throw new Error("Error Find Save Blog: " + e)
        }
    }

    static async addSavedBlogToUser(saveId, userId) {
        try {
            return usersCollection.findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $addToSet: { saveBlog: new ObjectId(saveId) } }
            )
        } catch (e) {
            throw new Error("Error Add Save Blog: " + e)
        }
    }

    static async removeSavedBlogFromUser(saveId, userId) {
        try {
            return await usersCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $pull: { saveBlog: new ObjectId(saveId) } }
            )
        } catch (e) {
            throw new Error("Error Remove Save Blog: " + e)
        }
    }
}