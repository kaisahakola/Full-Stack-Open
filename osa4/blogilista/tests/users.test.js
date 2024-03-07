const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
})

describe('add new users', () => {
    test('username cannot be too short', async () => {
        const user = {
            username: 'ab',
            name: 'Abc Def',
            password: 'secret'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    test('password cannot be too short', async () => {
        const user = {
            username: 'abcdef',
            name: 'Abc Def',
            password: 'se'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})