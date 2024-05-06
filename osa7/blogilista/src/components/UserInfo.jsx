import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserInfo = () => {
  const users = useSelector(state => state.users)
  const { userId } = useParams()
  const user = users.find(user => user.id === userId)

  if (!user) {
    return <div>User info not found</div>
  }

  const blogs = [...user.blogs]

  return (
    <div className="page">
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserInfo
