export default class Blog {
    constructor({ content, fileUrl, fileType, user, comments = [], reactions = [] }) {
        this.content = content
        this.fileUrl = fileUrl
        this.fileType = fileType
        this.user = user
        this.comments = comments
        this.reactions = reactions
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }
}
