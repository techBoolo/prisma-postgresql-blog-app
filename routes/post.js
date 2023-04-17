import express from 'express'
import postController from '../controllers/post.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.route('/')
  .get(postController.index)
  .post(authenticate, postController.create)

export default router
