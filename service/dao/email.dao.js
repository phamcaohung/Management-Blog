import { ObjectId } from "mongodb"

let emailsCollection

export default class emailsDAO {
    static async injectDB(conn) {
        if (emailsCollection)
            return
        try {
            emailsCollection = await conn.db(process.env.DATABASE_NAME).collection("emails")
        } catch (e) {
            console.error(`Unable to establish collection handles: ${e}`)
        }
    }

    static async createEmail(data) {
        try {
            const result = await emailsCollection.insertOne(data)
            return result
        } catch (e) {
            throw new Error("Error creating email: " + e)
        }
    }

    static async findEmailByEmailAndCode(email, code) {
        try {
            return await emailsCollection.findOne({ email: email, verificationCode: code})
        } catch (e) {
            throw new Error("Error Find Email By Email And Code: " + e)
        }
    }

    static async deleteEmailsByEmail(email) {
        try {
            return await emailsCollection.deleteMany({ email: email})
        } catch (e) {
            throw new Error("Error Delete Emails By Email: " + e)
        }
    }
}