const listHelper = require('../utils/list_helper').favouriteBlog

describe('favourite', () => {
    test('blog with most likes', () => {
        const blogs = [
            {
                title: 'test blog 1', 
                author: 'test blog 1',
                url: 'test blog 1', 
                likes: 5
            },
            {
                title: 'test blog 2',
                author: 'test blog 2',
                url: 'test blog 2',
                likes: 6
            },
            {
                title: 'test blog 3',
                author: 'test blog 3',
                url: 'test blog 3',
                likes: 7
            }
        ]

        const expectedBlog = {
            title: 'test blog 3', 
            author: 'test blog 3', 
            url: 'test blog 3', 
            likes: 7
        }
        
        expect(JSON.parse(listHelper(blogs))).toEqual(expectedBlog)
    })
})