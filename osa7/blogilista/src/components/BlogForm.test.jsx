import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('createBlog is called with correct information', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')
    const likes = screen.getByPlaceholderText('likes')
    const button = screen.getByText('add')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'testurl')
    await user.type(likes, '0')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    console.log(createBlog.mock.calls)

    expect(createBlog).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'testurl',
      likes: 0,
    })
  })
})
