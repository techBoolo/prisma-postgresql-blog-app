import express from 'express'
import cors from 'cors'

import postRoute from './routes/post.js'

const app = express()

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

app.use((req, res, next) => {
  const error = new Error('Route not found.')
  error.statusCode = 404
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
