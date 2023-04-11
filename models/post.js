import { getDB } from '../config/db.js'

const getPosts = async () => {
  const db = getDB()
  return await db.post.findMany({
    include: { author: true }
  })
}

export default {
  getPosts,
}
