/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <p>
            {anecdote.content}
            <br />
            has {anecdote.votes} votes
            <button onClick={handleClick}>vote</button>
        </p>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const { filter, anecdotes } = useSelector(state => state)

    const handleVote = (anecdote) => {
        const updatedAnecdote = {
            content: anecdote.content,
            id: anecdote.id,
            votes: anecdote.votes + 1
        }
        dispatch(vote(updatedAnecdote))
        dispatch(setNotification(`you voted for '${anecdote.content}'`, 3))
    }

    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

    return (
        <div>
            {filteredAnecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => handleVote(anecdote)}
                    />
            )}
        </div>
    )
}

export default AnecdoteList