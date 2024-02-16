const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('api', () => {
    test('returned blogs are in json form', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a new blog can be added', async () => {
        const newBlog = {
            title: 'test title 3',
            author: 'Test Author 3',
            url: 'test url',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'test title 3'
        )
    })

    test('id property is in correct form', async () => {
        const newBlog = {
            title: 'test title 4',
            author: 'test author 4',
            url: 'test url 4',
            likes: 4
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const addedBlog = response.body

        expect(addedBlog).toHaveProperty('id')
        expect(addedBlog.id).toBeDefined()
    })

    test('likes is 0 if no likes are given', async () => {
        const newBlog = {
            title: 'test title 5',
            author: 'test author 5',
            url: 'test url 5'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const blogsAtEnd = response.body
        const createdBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

        expect(createdBlog.likes).toBe(0)
    })

    test('status 400 if no title or url are given', async () => {
        const newBlog = {
            author: 'test author 6',
            url: 'test url 6',
            likes: 6
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})