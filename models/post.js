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
          email: true
        }
      },
      comments: true 
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
export default {
  getPosts,
  createPost,
  getPost,
  updatePost,
}
