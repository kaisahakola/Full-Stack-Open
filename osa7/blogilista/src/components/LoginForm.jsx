import { useDispatch, useSelector } from 'react-redux'
import { login, setPassword, setUsername } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector(state => state.login)

  const handleLogin = async event => {
    event.preventDefault()

    try {
      dispatch(login(username, password))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 5, 'error'))
    }
  }

  const handleUsernameChange = event => {
    dispatch(setUsername(event.target.value))
  }

  const handlePasswordChange = event => {
    dispatch(setPassword(event.target.value))
  }

  return (
    <div className="freeSpace">
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
