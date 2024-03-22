import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes: newBlog.likes
        })

        setNewBlog({ title: '', author: '', url: '', likes: 0 })
    }

    const handleBlogChange = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    data-testid='title'
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleBlogChange}
                    placeholder='title'
                />
            </div>

            <div>
                author
                <input
                    data-testid='author'
                    type="text"
                    name="author"
                    value={newBlog.author}
                    onChange={handleBlogChange}
                    placeholder='author'
                />
            </div>

            <div>
                url
                <input
                    data-testid='url'
                    type="text"
                    name="url"
                    value={newBlog.url}
                    onChange={handleBlogChange}
                    placeholder='url'
                />
            </div>

            <div>
                likes
                <input
                    data-testid='likes'
                    type="number"
                    name="likes"
                    value={newBlog.likes}
                    onChange={handleBlogChange}
                    placeholder='likes'
                />
            </div>

            <button type="submit">add</button>
        </form>
    )
}

BlogForm.PropTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm