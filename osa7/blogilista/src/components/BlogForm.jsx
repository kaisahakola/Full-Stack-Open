import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const addBlog = event => {
    event.preventDefault()
    try {
      const title = event.target.title.value
      const author = event.target.author.value
      const url = event.target.url.value
      const likes = event.target.likes.value

      const newBlog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
      }

      event.target.title.value = ''
      event.target.author.value = ''
      event.target.url.value = ''
      event.target.likes.value = 0

      dispatch(createBlog(newBlog))
      dispatch(setNotification(`new blog '${title}' added`, 5, 'success'))
    } catch (error) {
      console.error(error)
      dispatch(setNotification('error adding new blog', 5, 'error'))
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          data-testid="title"
          type="text"
          name="title"
          placeholder="title"
        />
      </div>

      <div>
        author
        <input
          data-testid="author"
          type="text"
          name="author"
          placeholder="author"
        />
      </div>

      <div>
        url
        <input data-testid="url" type="text" name="url" placeholder="url" />
      </div>

      <div>
        likes
        <input
          data-testid="likes"
          type="number"
          name="likes"
          placeholder="likes"
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
