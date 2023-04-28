import { getDB } from '../config/db.js'

const createComment = async (newComment) => {
  const db = getDB()
  return await db.comment.create({
    data: newComment,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          admin: true
        }
      }
    }
  })
}

export default {
  createComment,
}
