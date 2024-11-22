/* eslint-disable react/prop-types */
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Recommendations = (props) => {
  const { show, favoriteGenre } = props;
  const { data, loading, error } = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
    skip: !favoriteGenre,
  });

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error.message}</>;
  const books = data ? data.allBooks : [];

  if (!show) {
    return null;
  }

  if (!favoriteGenre) {
    return <p>You do not have a favorite genre set.</p>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favourite genre {favoriteGenre}</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
