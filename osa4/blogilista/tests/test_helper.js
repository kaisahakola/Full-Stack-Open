const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'test title 1',
        author: 'test author 1',
        url: 'test url 1',
        likes: 1
    },
    {
        title: 'test title 2',
        author: 'test author 2',
        url: 'test url 2',
        likes: 2
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'testing', url: 'testing', likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}