import Togglable from './Togglable'
import BlogForm from './BlogForm'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const style = {
    textDecoration: 'none',
    color: 'black',
  }
  return (
    <div>
      <Link style={style} to={`/blog/${blog.id}`}>
        {blog.title}
      </Link>
    </div>
  )
}

const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const { user, username } = useSelector(state => state.login)

  const filteredBlogs = user
    ? blogs.filter(blog => blog.user.username === username)
    : []

  return (
    <div className="page">
      <h2>Blogs</h2>

      <div className="compactContainer">
        <div className="freeSpace">
          <ListGroup className="blogList">
            {filteredBlogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <ListGroup.Item>
                  <Blog key={blog.id} blog={blog} />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>

        <div className="freeSpace">
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      </div>
    </div>
  )
}

export default BlogList
