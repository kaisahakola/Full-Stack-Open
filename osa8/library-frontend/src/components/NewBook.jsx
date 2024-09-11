/* eslint-disable react/prop-types */
import { useState } from 'react'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const NewBook = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // UseMutation with the update function to update cache
  const [createBook] = useMutation(CREATE_BOOK, {
    onError: error => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    },
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  // Early return if the component should not be shown
  if (!props.show) {
    return null
  }

  const submit = async event => {
    event.preventDefault()

    createBook({
      variables: { title, published: parseInt(published, 10), author, genres },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
