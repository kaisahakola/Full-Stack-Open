import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, updateBlog, deleteBlog } from './reducers/blogReducer'
import { login, clearUser } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const { user, username } = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const loggedUser = JSON.parse(loggedUserJson)
      dispatch(login(loggedUser))
    }
  }, [])

  const handleLikes = async blog => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }, blog.id))
  }

  const handleDelete = async blog => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog.id))

      dispatch(
        setNotification(
          `blog '${blog.title}' deleted succesfully`,
          5,
          'success',
        ),
      )
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
    window.location.reload()
  }

  const filteredBlogs = user
    ? blogs.filter(blog => blog.user.username === username)
    : []

  return (
    <>
      <h1>Blog App</h1>
      <Notification />

      {!user && <LoginForm />}

      {user && (
        <div>
          <div>
            <p>{`${username} logged in`}</p>
            <button onClick={logOut}>log out</button>

            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </div>

          <div>
            <h2>blogs</h2>
            <div className="blogList">
              {filteredBlogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    likeTheBlog={() => handleLikes(blog)}
                    deleteBlog={() => handleDelete(blog)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
