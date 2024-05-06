import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const { message, status } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return (
    <Alert variant={status === 'success' ? 'success' : 'danger'}>
      {message}
    </Alert>
  )
}

export default Notification
