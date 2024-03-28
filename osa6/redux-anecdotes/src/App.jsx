import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  return (
    <>
      <h2>Anecdotes</h2>
      <AnecdoteForm />
      <Filter />
      <Notification />
      <AnecdoteList />
    </>
  )
}

export default App