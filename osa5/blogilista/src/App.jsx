import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blog'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isErrorVisible, setIsErrorVisible] = useState(false)
    const [isSuccessVisible, setIsSuccessVisible] = useState(false)

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

    const addBlog = async (event) => {
        event.preventDefault()

        const blogObj = {
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes
        }

        const returnedBlog = await blogService.createNew(blogObj)

        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({title: '', author: '', url: '', likes: 0})

        setSuccessMessage(`a new blog ${newBlog.title} added`)
        setIsSuccessVisible(true)

        setTimeout(() => {
            setSuccessMessage('')
            setIsSuccessVisible(false)
        }, 5000);
    }

    const handleBlogChange = (event) => {
        const { name, value } = event.target
        setNewBlog({...newBlog, [name]: value})
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})

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
                    setUsername={setUsername}
                    setPassword={setPassword}
                />}

            {user &&
                <div>
                    <div>
                        <p>{`${user.username} logged in`}</p>
                        <button onClick={logOut}>log out</button>

                        <h2>create new</h2>
                        <BlogForm 
                            newBlog={newBlog}
                            handleBlogChange={handleBlogChange}
                            addBlog={addBlog}
                        />
                    </div>

                    <div>
                        <h2>blogs</h2>
                        {blogs
                            .filter(blog => blog.user.username === user.username)
                            .map(blog => <Blog key={blog.id} blog={blog} />)
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default App