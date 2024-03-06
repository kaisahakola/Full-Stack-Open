const listHelper = require('../utils/list_helper').mostLikes

describe('most likes', () => {
    test('find author with most likes', () => {
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
                likes: 5
            },
            {
                title: 'test blog 3',
                author: 'Most Blogs',
                url: 'test blog 3',
                likes: 5
            },
            {
                title: 'test blog 4',
                author: 'Most Blogs',
                url: 'test blog 4',
                likes: 5
            },
            {
                title: 'test blog 5',
                author: 'Most Blogs',
                url: 'test blog 5',
                likes: 5
            }
        ]

        const expectedResult = {
            author: 'Most Blogs',
            likes: 15
        }

        expect(listHelper(blogs)).toEqual(expectedResult)

    })
})