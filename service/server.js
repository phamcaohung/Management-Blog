import express from 'express'
import cors from 'cors'
import userRouters from './routes/user.routes.js'
import blogsRouters from './routes/blog.routes.js'
import passport from 'passport'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const app = express()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use("/assets/userFiles", express.static(__dirname + "/assets/userFiles"))
app.use("/assets/userAvatars", express.static(__dirname + "/assets/userAvatars"))
app.get('/', (req, res) => {
  res.send('<h1>Backend here!</h1>')
})

app.use("/api/v1/users", userRouters)
app.use("/api/v1/blogs", blogsRouters)

export default app
