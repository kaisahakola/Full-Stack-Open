import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value =''
        dispatch(createAnecdote(content))

        dispatch(showNotification(`new anecdote '${content}' added`))
        setTimeout(() => {
            dispatch(showNotification(''))
        }, 3000)
    }

    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>add</button>
        </form>
    )
}

export default AnecdoteForm