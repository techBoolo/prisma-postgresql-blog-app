import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({ message: 'it works!' })
})

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
