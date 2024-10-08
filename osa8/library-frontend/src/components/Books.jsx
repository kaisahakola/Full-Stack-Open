/* eslint-disable react/prop-types */
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = props => {
  const { loading, error, data } = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  let books = []

  if (loading) return <>Loading...</>
  if (error) return <>Error: {error.message}</>
  if (data) {
    books = data.allBooks
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
