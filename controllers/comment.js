import authorize from '../accesscontrol/authorize.js'
import Comment from '../models/comment.js'

const create = async (req, res) => {
  const commentData = req.body
  const { userData } = req
  authorize(userData, 'create', 'Comment')
  const comment = await Comment.createComment(commentData)

  res.status(201).json(comment)
}

export default {
  create,
}
