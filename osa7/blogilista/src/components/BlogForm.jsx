import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
    <div className="freeSpace">
      <h4>Add new blog</h4>
      <Form onSubmit={addBlog}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            data-testid="title"
            type="text"
            name="title"
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            data-testid="author"
            type="text"
            name="author"
            placeholder="Enter author"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            data-testid="url"
            type="text"
            name="url"
            placeholder="Enter URL"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Likes</Form.Label>
          <Form.Control
            data-testid="likes"
            type="number"
            name="likes"
            placeholder="Enter likes"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
