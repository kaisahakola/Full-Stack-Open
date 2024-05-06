import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'
import Menu from './components/Menu'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, clearUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.login)

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const logOut = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(clearUser())
  }

  return (
    <div className="container">
      <Router>
        {!user && (
          <div className="loginForm">
            <h1>Blog App</h1>
            <Notification />
            <LoginForm />
          </div>
        )}
        {user && (
          <div>
            <Menu logOut={logOut} />
            <Notification />

            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<UserInfo />} />
              <Route path="/blog/:blogId" element={<BlogInfo />} />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  )
}

export default App
