import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [isSuccessVisible, setIsSuccessVisible] = useState(false)

    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => {
            setBlogs(blogs)
            // console.log('Blogs:', blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJson) {
            const user = JSON.parse(loggedUserJson)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()

        try {
            const newBlog = await blogService.createNew(blogObject)
            setBlogs(blogs.concat(newBlog))

            const allBlogs = await blogService.getAll()
            setBlogs(allBlogs)

            setSuccessMessage(`a new blog ${newBlog.title} added`)
            setIsSuccessVisible(true)

            setTimeout(() => {
                setSuccessMessage('')
                setIsSuccessVisible(false)
            }, 5000)

        } catch(error) {
            console.error(error)

            setErrorMessage('Error adding new blog')
            setIsErrorVisible(true)

            setTimeout(() => {
                setErrorMessage('')
                setIsErrorVisible(false)
            }, 5000)
        }
    }

    const likeTheBlog = async (blog) => {
        const updatedBlog = await blogService.update({ ...blog, likes: blog.likes + 1 }, blog.id)
        setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))

        const allBlogs = await blogService.getAll()
        setBlogs(allBlogs)
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Delete ${blog.title}?`)) {
            await blogService.deleteBlog(blog.id)
            setBlogs(blogs.filter(b => b.id !== blog.id))

            const allBlogs = await blogService.getAll()
            setBlogs(allBlogs)

            setSuccessMessage('Blog deleted succesfully')
            setIsSuccessVisible(true)

            setTimeout(() => {
                setSuccessMessage(null)
                setIsSuccessVisible(false)
            }, 5000)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            // console.log('User: ', user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            setErrorMessage('wrong username or password')
            setIsErrorVisible(true)

            setTimeout(() => {
                setErrorMessage(null)
                setIsErrorVisible(false)
            }, 5000)
        }
    }

    const logOut = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.location.reload()
    }

    return (
        <>
            <h1>Blog App</h1>
            <SuccessMessage message={successMessage} isVisible={isSuccessVisible} />
            <ErrorMessage message={errorMessage} isVisible={isErrorVisible} />

            {!user &&
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => {setUsername(target.value)}}
                    handlePasswordChange={({ target }) => {setPassword(target.value)}}
                />}

            {user &&
                <div>
                    <div>
                        <p>{`${user.username} logged in`}</p>
                        <button onClick={logOut}>log out</button>

                        <Togglable buttonLabel="new blog" ref={blogFormRef}>
                            <BlogForm createBlog={addBlog} />
                        </Togglable>

                    </div>

                    <div>
                        <h2>blogs</h2>
                        <div className='blogList'>
                            {blogs
                                .sort((a, b) => b.likes - a.likes)
                                .filter(blog => blog.user.username === user.username)
                                .map(blog =>
                                    <Blog
                                        key={blog.id}
                                        blog={blog}
                                        likeTheBlog={() => likeTheBlog(blog)}
                                        deleteBlog={() => deleteBlog(blog)}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default App