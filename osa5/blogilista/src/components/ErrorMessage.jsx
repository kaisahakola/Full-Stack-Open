import PropTypes from 'prop-types'

const ErrorMessage = ({ message, isVisible }) => {

    let visibility = ''

    if (isVisible) {
        visibility += 'block'
    } else {
        visibility += 'none'
    }

    if (message === null) {
        return null
    } else {
        return (
            <div className="errorMessage" style={{ display: visibility }}>
                {message}
            </div>
        )
    }
}

ErrorMessage.PropTypes = {
    message: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default ErrorMessage