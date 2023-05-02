import authorize from '../accesscontrol/authorize.js'
import Comment from '../models/comment.js'
import { subject } from '@casl/ability'

const create = async (req, res) => {
  const commentData = req.body
  const { userData } = req
  authorize(userData, 'create', 'Comment')
  const comment = await Comment.createComment(commentData)

  res.status(201).json(comment)
}

const update = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const { userData } = req

  const comment = await Comment.getComment({ id })
  authorize(userData, 'update', subject('Comment', { ...comment }))
  const response = await Comment.updateComment({ id, ...updateData })

  res.status(200).json(response)
}

const remove = async (req, res) => {
  const { id } = req.params
  const { userData } = req
  const comment = await Comment.getComment({ id })
  authorize(userData, 'delete', subject('Comment', { ...comment }))
  const response = await Comment.deleteComment({ id })

  res.status(200).json(response)
}
export default {
  create,
  update,
  remove,
}
