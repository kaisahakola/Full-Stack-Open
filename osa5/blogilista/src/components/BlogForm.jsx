/* eslint-disable react/prop-types */
import { useState } from "react"

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
        setNewBlog({...newBlog, [name]: value})
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                    type="text"
                    name="title"
                    value={newBlog.title}
                    onChange={handleBlogChange} 
                />
            </div>

            <div>
                author
                <input
                    type="text"
                    name="author"
                    value={newBlog.author}
                    onChange={handleBlogChange}
                />
            </div>

            <div>
                url
                <input 
                    type="text"
                    name="url"
                    value={newBlog.url}
                    onChange={handleBlogChange}
                />
            </div>

            <div>
                likes
                <input 
                    type="number"
                    name="likes"
                    value={newBlog.likes}
                    onChange={handleBlogChange}
                />
            </div>

            <button type="submit">add</button>
        </form>
    )
}

export default BlogForm