let relationshipCollection

export default class relationshipDAO {
    static async injectDB(conn) {
        if (relationshipCollection)
            return
        try {
            relationshipCollection = await conn.db(process.env.DATABASE_NAME).collection("relationships")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async exists(followerId, followingId) {
        try {
            const result = await relationshipCollection.findOne({ 
                follower: followerId,
                following: followingId
            })
            return result
        } catch (e) {
            throw new Error("Error: " + e);
        }
    }

    static async create(followerId, followingId) {
        try {
            const data = {
                follower: new Object(followerId),
                following: new Object(followingId)
            }
            await relationshipCollection.insertOne(data)
        } catch (e) {
            throw new Error("Error creating relationship: " + e);
        }
    }

    static async delete(followerId, followingId) {
        try {
            const data = {
                follower: new Object(followerId),
                following: new Object(followingId)
            }
            await relationshipCollection.deleteOne(data)
        } catch (e) {
            throw new Error("Error deleting relationship: " + e);
        }
    }
}