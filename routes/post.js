import express from 'express'
import postController from '../controllers/post.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.route('/')
  /**
  *@swagger
  * /posts:
  *   get:
  *     tags:
  *       - Posts
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
   *      tags:
   *        - Posts
   *      description: add a new post
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                title:
   *                  type: string
   *                content:
   *                  type: string
   *                author_id:
   *                  type: string
   *      responses:
   *        '201':
   *          description: create a new post
   *          content:
   *            application/json:
   *              schema:
   *                type: object 
   *                properties:
   *                  title:
   *                    type: string
   *                    example: title of the post
   *                  content:
   *                    type: string
   *                    example: description or content of the post
   *                  author_id:
   *                    type: string
   *                    example: 7ef7e09f-a50b-4d16-afc6-ce162e369e71
   *        '401':
   *          description: Error unauthorized
   *          content:
   *            application/json:
   *              schema:
   *                type: object
   *                properties:
   *                  error:
   *                    type: object
   *                    properties:
   *                      message:
   *                        type: string
   *                        example: Please provide your credential
   *        default:
   *          description: unexpected error
   */
  .post(authenticate, postController.create)

  router.route('/:id')
    /**
     * @swagger
     *  /posts/{id}:
     *    get:
     *      tags:
     *        - Posts
     *      description: get a post
     *      parameters:
     *        - in: path
     *          name: id
     *          schema:
     *            type: string
     *          required: true
     *          description: uuid of the post to fetch
     *          example: 84774d8a-ec32-4748-866d-8bc69bd85b44
     *      responses:
     *        '200':
     *          description: returns the post requested
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     *                    example: 84774d8a-ec32-4748-866d-8bc69bd85b44
     *                  title:
     *                    type: string
     *                    example: title of the post
     *                  content:
     *                    type: string
     *                    example: content of the post with the above title
     *                  author_id:
     *                    type: string
     *                  date:
     *                    type: string
     *                  updatedAt:
     *                    type: string
     *                  author:
     *                    type: object
     *                  comments:
     *                    type: array
     *                    items:
     *                      type: object
     *
    */
    .get(postController.show)
    /**
     * @swagger
     *  /posts/{id}:
     *    patch:
     *      tags:
     *        - Posts
     *      description: update a post
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          description: id of the post to update
     *          schema:
     *            type: string
     *            example: debe6fa6-f18f-44a2-8b3d-8496cdfcf8e3
     *      requestBody:
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                title:
     *                  type: string
     *                  example: update text of the title
     *                content:
     *                  type: string
     *                  example: update text of the post content
     *      responses:
     *        '200':
     *          description: update the post
     *          content:
     *            appliction/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     *                    example: debe6fa6-f18f-44a2-8b3d-8496cdfcf8e3
     *                  title:
     *                   type: string
     *                   example: update text of the title
     *                  content:
     *                   type: string
     *                   example: update text of the post content
     *                  author:
     *                    type: object
     *        '401':
     *          description: Error unauthorized
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: object
     *                    properties:
     *                      message:
     *                        type: string
     *                        example: Please provide your credential
     *        default:
     *          description: unexpected error
     *
    */
    .patch(authenticate, postController.update)
    /**
     * @swagger
     *  /posts/{id}:
     *    delete:
     *      tags:
     *        - Posts
     *      description: delete a post
     *      parameters:
     *        - in: path
     *          name: id
     *          required: true
     *          description: 'id of the post'
     *          schema:
     *            type: string
     *            example: 84774d8a-ec32-4748-866d-8bc69bd85b44
     *      responses:
     *        '200':
     *          description: post deleted
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  id:
     *                    type: string
     *                  title:
     *                    type: string
     *                  content:
     *                    type: string
     *        '401':
     *          description: Error unauthorized
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  error:
     *                    type: object
     *                    properties:
     *                      message:
     *                        type: string
     *                        example: Please provide your credential
     *        default:
     *          description: unexpected error
     *
    */
    .delete(authenticate, postController.remove)

export default router
