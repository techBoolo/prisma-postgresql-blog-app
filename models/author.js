import { getDB } from '../config/db.js'

const findAuthor = async (query) => {
  const db = getDB()
  return await db.author.findUnique({
    where: query
  })
}

const create = async (authorInfo) => {
  const db = getDB()
  return await db.author.create({
    data: authorInfo,
    select: {
      id: true,
      name: true,
      email: true,
      admin: true
    }
  })
}

export default {
  create,
  findAuthor,
}
