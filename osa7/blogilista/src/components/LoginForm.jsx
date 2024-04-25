import { useDispatch, useSelector } from 'react-redux'
import { login, setPassword, setUsername } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="username"
          onChange={handleUsernameChange}
        />
      </div>

      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
