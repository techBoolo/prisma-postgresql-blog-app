import express from 'express'
import cors from 'cors'
import 'express-async-errors'
import swagger from './middlewares/swagger.js'
import ErrorResponse from './utils/errorResponse.js'

import postRoute from './routes/post.js'
import authorRoute from './routes/author.js'
import commentRoute from './routes/comment.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
  const requestTime = new Date().toLocaleString(undefined, { })
  console.log(req.method, req.url, requestTime);
  next()
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'it works!' })
})

app.use('/posts', postRoute)
app.use('/authors', authorRoute)
app.use('/comments', commentRoute)

swagger(app)
app.use((req, res, next) => {
  const error = new ErrorResponse({
    statusCode: 404,
    message: 'Route not found.'
  })
  next(error)
})

app.use((error, req, res, next) => {
  res.statusCode = error.statusCode || 500
  res.json({ 
    error: { 
      message: error.message 
    }
  })
})

export default app
