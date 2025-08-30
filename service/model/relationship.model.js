export default class Relationship {
    constructor({ follower, following }) {
        this.follower = follower
        this.following = following
        this.createdAt = new Date()
    }
}