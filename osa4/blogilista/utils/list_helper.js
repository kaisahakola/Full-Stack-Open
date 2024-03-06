const lodash = require("lodash");

const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    let likes = 0

    if (blogs) {
        blogs.forEach(blog => {
            likes += blog.likes
        })

        return likes
    }

    return 0
}

const favouriteBlog = (blogs) => {
    let likes = []

    if (blogs) {
        blogs.forEach(blog => {
            likes = likes.concat(blog.likes)
        })

        const sortedLikes = likes.sort((a, b) => b - a)
        const mostLikes = sortedLikes[0]

        let result

        blogs.forEach(blog => {
            if (blog.likes === mostLikes) {
                result = JSON.stringify(blog)
            }
        })

        return result
    }
}

const mostBlogs = (blogs) => {

    let authors = []

    blogs.forEach(blog => {
        authors.push(blog.author)
    })

    const countBlogs = lodash.countBy(authors)
    const authorWithMostBlogs = lodash.maxBy(Object.keys(countBlogs), string => countBlogs[string])

    const numberOfBlogs = countBlogs[authorWithMostBlogs]

    const result = {
        author: authorWithMostBlogs,
        blogs: numberOfBlogs
    }

    return result
}

const mostLikes = (blogs) => {

    const authors = lodash.groupBy(blogs, 'author')
    const authorTotalLikes = lodash.mapValues(authors, blogs => lodash.sumBy(blogs, 'likes'))

    const mostLikedAuthor = lodash.maxBy(Object.keys(authorTotalLikes), author => authorTotalLikes[author])
    const likes = authorTotalLikes[mostLikedAuthor]

    const result = {
        author: mostLikedAuthor,
        likes: likes
    }

    return result
}
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}