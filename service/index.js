import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import usersDAO from './dao/user.dao.js'
import tokenDAO from './dao/token.dao.js'
import relationshipDAO from './dao/relationship.dao.js'
import emailsDAO from './dao/email.dao.js'
import blogsDAO from './dao/blog.dao.js'
import commentsDAO from './dao/comment.dao.js'
import reactionsDAO from './dao/reaction.dao.js'

async function main() {
  dotenv.config()

  const client = new mongodb.MongoClient(process.env.DATABASE)
  const port = process.env.PORT || 5000
  const hostName = process.env.HOST_NAME
  try {
    await client.connect()
    await usersDAO.injectDB(client)
    await tokenDAO.injectDB(client)
    await relationshipDAO.injectDB(client)
    await emailsDAO.injectDB(client)
    await blogsDAO.injectDB(client)
    await commentsDAO.injectDB(client)
    await reactionsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Server is running on port ${hostName}:${port}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
main().catch(console.error) 