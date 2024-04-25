import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeTheBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const combinedStyle = {
    ...blogStyle,
    ...showWhenVisible,
  }

  return (
    <div className="blog">
      <div
        style={hideWhenVisible}
        className="blogTitle"
        data-testid="addedTitle">
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={combinedStyle} className="blogInfo">
        {blog.title}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.author}
        <br />
        {blog.url}
        <br />
        likes: {blog.likes}
        <button onClick={likeTheBlog}>like</button>
        <br />
        {blog.user.username}
        <br />
        <button onClick={deleteBlog}>delete</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeTheBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
