/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

    const filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(filter))

    return (
        <div>
            {filteredAnecdotes
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => dispatch(vote(anecdote.id))}
                    />
            )}
        </div>
    )
}

export default AnecdoteList