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
            <div className="error" style={{display: visibility}}>
                {message}
            </div>
        )
    }
}

export default ErrorMessage