import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const { blogId } = useParams()
  const blog = blogs.find(blog => blog.id === blogId)

  const handleLikes = async blog => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, blog.id))
  }

  return (
    <div className="page">
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => handleLikes(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default BlogInfo
