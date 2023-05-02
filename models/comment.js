import { getDB } from '../config/db.js'

const getComment = async (query) => {
  const db  = getDB()
  return await db.comment.findUnique({
    where: query
  })
}

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

const updateComment = async ({ id, content }) => {
  const db = getDB()
  return await db.comment.update({
    where: { id },
    data: { content },
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

const deleteComment = async ({ id }) => {
  const db = getDB()
  return await db.comment.delete({
    where: { id }
  })
}

export default {
  createComment,
  getComment,
  updateComment,
  deleteComment,
}
