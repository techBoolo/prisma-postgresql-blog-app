import express from 'express'
import postController from '../controllers/post.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.route('/')
  /**
  *@swagger
  * /posts:
  *   get:
  *     description: return list of posts
  *     responses:
  *       '200':
  *         description: array of posts
  *         content:
  *           application/json:
  *             schema:
  *               type: array
  *               items:
  *                 type: object
  *                 properties:
  *                   id:
  *                     type: string
  *                     example: "8d2dd949-6424-4aa5-959d-28665558c6aa"
  *                   title:
  *                     type: string
  *                     example: 'title of the post'
  *                   content:
  *                     type: string
  *                     example: 'content of the post'
  *                   author_id:
  *                     type: string
  *                     example: '8d2dd949-6424-4aa5-959d-28665558c6aa'
  *                   date:
  *                     type: dateTime
  *                     example: 2023-04-17T11:00:57.683Z
  *                   updatedAt: 
  *                     type: dateTime
  *                     example: 2023-04-17T11:00:57.683Z
  */
  .get(postController.index)
  /**
   *@openapi
   *  /posts:
   *    post:
   *      description: add a new post
   *      responses:
   *        '201':
   *          description: create a new post
   *          content:
   *            application/json:
   *              schema:
   *                
   */
  .post(authenticate, postController.create)

  router.route('/:id')
    /**
     * @swagger
     *  /posts/:id:
     *    get:
     *      description: get a post
     *
    */
    .get(postController.show)
    /**
     * @swagger
     *  /posts/:id:
     *    patch:
     *      description: update a post
     *
    */
    .patch(authenticate, postController.update)
    /**
     * @swagger
     *  /posts/:id:
     *    delete:
     *      description: delete a post
     *
    */
    .delete(authenticate, postController.remove)

export default router
