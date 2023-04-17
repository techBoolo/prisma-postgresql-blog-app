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

export default {
  index,
  create
}
