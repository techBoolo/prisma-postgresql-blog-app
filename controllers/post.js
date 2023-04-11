import Post from '../models/post.js'
const index = async (req, res) => {
  const posts = await Post.getPosts()
  res.status(200).json(posts)
}

export default {
  index
}
