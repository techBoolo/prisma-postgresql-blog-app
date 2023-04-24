  /**
  *@swagger
  * /posts:
  *   get:
  *     description; return list of posts
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
  */
