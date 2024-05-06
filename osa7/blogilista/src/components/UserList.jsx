import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const User = ({ user }) => {
  const numberOfBlogs = user.blogs.length

  const link = {
    textDecoration: 'none',
    color: 'black',
  }

  return (
    <tr>
      <td>
        <Link style={link} to={`/user/${user.id}`}>
          {user.name}
        </Link>
      </td>
      <td>{numberOfBlogs}</td>
    </tr>
  )
}

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const sortedUsers = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div className="page">
      <h2>Users</h2>

      <div className="freeSpace">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Users</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map(user => (
              <User key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default UserList
