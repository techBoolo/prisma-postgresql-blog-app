import { getDB } from '../config/db.js'

const getPosts = async () => {
  const db = getDB()
  return await db.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
}

const createPost = async (postData) => {
  const db = getDB()
  return await db.post.create({
    data: postData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
}

const getPost = async (id) => {
  const db = getDB()
  return await db.post.findUnique({
    where: id,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          admin: true,
        }
      },
      comments: {
        select: {
          id: true,
          content: true,
          date: true,
          updatedAt: true,
          post_id: true,
          author_id: true,
          author: {
            select: {
              id: true,
              email: true,
              name: true,
              admin: true
            }
          }
        }
      }
    }
  })
}

const updatePost = async (id, postData) => {
  const db = getDB()
  return await db.post.update({
    where: id,
    data: postData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })
}

const deletePost = async (id) => {
  const db = getDB()
  return await db.post.delete({ where: id })
}

export default {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
}
