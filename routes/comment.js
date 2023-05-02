import express from 'express'
import commentController from '../controllers/comment.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.route('/')
  .post(authenticate, commentController.create)
router.route('/:id')
  .patch(authenticate, commentController.update)
  .delete(authenticate, commentController.remove)

export default router
