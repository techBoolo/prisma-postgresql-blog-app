import express from 'express'
import postController from '../controllers/post.js'

const router = express.Router()

router.route('/')
  .get(postController.index)

export default router
