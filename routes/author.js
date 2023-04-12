import express from 'express'
import authorController from '../controllers/author.js'

const router = express.Router()

router.route('/signup')
  .post(authorController.create)
router.route('/verify')
  .put(authorController.verify_token)

export default router
