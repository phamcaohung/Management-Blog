export default class Saved {
    constructor({ user, blog }) {
        this.user = user
        this.blog = blog
        this.createdAt = new Date()
    }
}