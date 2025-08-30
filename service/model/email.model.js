export default class Email {
    constructor({ email, verificationCode, messageId, purpose }) {
        this.email = email
        this.verificationCode = verificationCode
        this.messageId = messageId
        this.purpose = purpose
        this.createdAt = new Date()
        this.expiresAt = new Date(this.createdAt.getTime() + 1800 * 1000)
    }
}