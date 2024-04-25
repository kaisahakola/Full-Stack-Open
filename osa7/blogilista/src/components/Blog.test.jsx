import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('renders title but not other info', () => {
    const user = userEvent.setup()

    const blog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'testurl',
      likes: 0,
      user: user,
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blogTitle')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('Test title')

    const hidden = container.querySelector('.blogInfo')
    expect(hidden).toHaveStyle('display: none')
  })

  test('renders all info when view button is clicked', async () => {
    const user = userEvent.setup()

    const blog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'testurl',
      likes: 0,
      user: user,
    }

    const { container } = render(<Blog blog={blog} />)

    const button = screen.getByText('view')
    await user.click(button)

    const hidden = container.querySelector('.blogTitle')
    expect(hidden).toHaveStyle('display: none')

    const div = container.querySelector('.blogInfo')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('Test Author')
    expect(div).toHaveTextContent('testurl')
    expect(div).toHaveTextContent('0')
  })

  test('like button is called twice if it is clicked twice', async () => {
    const user = userEvent.setup()

    const blog = {
      title: 'Test title',
      author: 'Test Author',
      url: 'testurl',
      likes: 0,
      user: user,
    }

    const mockHandler = vi.fn()

    render(<Blog blog={blog} likeTheBlog={mockHandler} />)

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
