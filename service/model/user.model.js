export default class User {
    constructor({ name, email, password, avatar, followers = [], following = [], saveBlog = [], role = "general", isEmailVerified = false }) {
        this.name = name,
        this.email = email,
        this.password = password,
        this.avatar = avatar,
        this.followers = followers,
        this.following = following,
        this.saveBlog = saveBlog,
        this.role = role,
        this.isEmailVerified = isEmailVerified
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}