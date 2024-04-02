import { useState } from 'react'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'

const App = () => {
  const [notification, setNotification] = useState('')

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu setNotification={setNotification} />
      <Footer />
    </div>
  )
}

export default App
