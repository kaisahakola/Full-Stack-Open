/* eslint-disable react/prop-types */
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import About from './About'
import Anecdote from './Anecdote'

const Menu = ({ setNotification }) => {
    const padding = {
        paddingRight: 5
    }

    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const navigate = useNavigate()

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))

        setNotification(`A new anecdote "${anecdote.content}" was added!`)
        setTimeout(() => {
            setNotification('')
        }, 5000)
        navigate('/')
    }

    const match = useMatch('/anecdotes/:id')
    const anecdote = match
        ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
        : null
    
    return (
        <>
            <div>
                <Link style={padding} to='/'>anecdotes</Link>
                <Link style={padding} to='/create'>create new</Link>
                <Link style={padding} to='/about'>about</Link>
            </div>
            <Routes>
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path='/create' element={<CreateNew addNew={addNew} />} />
                <Route path='/about' element={<About />} />
                <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
            </Routes>
        </>
    )
}

export default Menu