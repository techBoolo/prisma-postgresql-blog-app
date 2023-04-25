import Post from '../models/post.js'

const index = async (req, res) => {
  const posts = await Post.getPosts()
  res.status(200).json(posts)
}

const create = async (req, res) => {
  const data = req.body
  const userData = req.userData
  
  const newPostData = {
    title: data.title,
    content: data.content,
    author_id: userData.id
  }

  const post = await Post.createPost(newPostData)
  res.status(201).json(post)
}

const show = async (req, res) => {
  const { id } = req.params
  const post = await Post.getPost({ id })

  res.status(200).json(post)
}

const update = async (req, res) => {
  const data = req.body
  const { id, ...rest } = data
  const post = await Post.updatePost({ id }, rest)
  
  res.status(200).json(post)
}

const remove = async (req, res) => {

  res.status(200).json({ message: 'under const' })
}

export default {
  index,
  create,
  show,
  update,
  remove,
}
