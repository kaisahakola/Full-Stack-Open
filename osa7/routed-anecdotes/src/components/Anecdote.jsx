/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
    return (
        <>
            <h2>{anecdote.content}</h2>
            <div>author: {anecdote.author}</div>
            <div>has {anecdote.votes} votes</div>
            <div>for more info visit <a href={anecdote.info} target="blank">{anecdote.info}</a></div>
        </>
    )
}

export default Anecdote