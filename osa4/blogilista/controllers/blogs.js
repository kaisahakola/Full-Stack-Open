const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    let likes = 0
    if (body.likes) {
        likes += body.likes
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes
    })

    const savedBlog = await blog.save()

    if (!body.title || !body.url) {
        response.status(400).end()
    } else {
        response.status(201).json(savedBlog)
    }
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})
  
blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter