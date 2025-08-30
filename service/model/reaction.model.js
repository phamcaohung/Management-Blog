export default class Reaction {
    constructor({ user, reaction, blog }) {
        this.blog = blog
        this.user = user
        this.reaction = reaction
        this.createdAt = new Date()
    }
}