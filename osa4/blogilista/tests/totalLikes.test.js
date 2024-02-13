const listHelper = require('../utils/list_helper').totalLikes

describe('total likes', () => {
    test('of empty list is zero', () => {
        const blogs = []
        expect(listHelper(blogs)).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const blogs = [{title: 'test', author: 'test', url: 'test', likes: 5}]
        expect(listHelper(blogs)).toBe(5)
    })

    test('of a blogger list is calculated right', () => {
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
            }
        ]

        expect(listHelper(blogs)).toBe(10)
    })
})