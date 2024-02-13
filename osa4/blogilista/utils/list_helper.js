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
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}