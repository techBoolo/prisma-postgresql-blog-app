import http from 'http'
import app from './app.js'
const PORT = process.env.PORT || 3001

const server = http.createServer()

server.on('request', app)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
