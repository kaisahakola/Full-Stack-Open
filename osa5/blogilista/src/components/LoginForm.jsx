import PropTypes from 'prop-types'

const LoginForm = (props) => (
    <form onSubmit={props.handleLogin}>
        <div>
            username
            <input
                type="text"
                value={props.username}
                name="username"
                onChange={props.handleUsernameChange}
            />
        </div>

        <div>
            password
            <input
                type="password"
                value={props.password}
                name="password"
                onChange={props.handlePasswordChange}
            />
        </div>
        <button type='submit'>login</button>
    </form>
)

LoginForm.PropTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm