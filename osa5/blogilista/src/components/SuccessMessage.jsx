import PropTypes from 'prop-types'

const SuccessMessage = ({ message, isVisible }) => {

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
            <div className="successMessage" style={{ display: visibility }}>
                {message}
            </div>
        )
    }
}

SuccessMessage.PropTypes = {
    message: PropTypes.string.isRequired,
    isVisible: PropTypes.bool.isRequired
}

export default SuccessMessage