export default class Comment {
    constructor({ content, user, blog }) {
        this.content = content
        this.user = user
        this.blog = blog
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}