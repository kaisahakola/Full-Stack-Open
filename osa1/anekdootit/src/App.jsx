import { useState } from 'react'

const Winner = ({ anecdotes, votes }) => {
  const highest = Math.max(...votes)
  let winners = []

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] === highest) {
      winners.push(i)
    }
  }

  // Check if there are two anecdotes with the most votes (show the first one)
  const winnerIndex = winners.length > 0 ? winners[0] : null;

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[winnerIndex]}</p>
      <p>has {votes[winnerIndex]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoting = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <button onClick={handleVoting}>vote</button>
      <Winner anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App