/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = ({ show, refetchTrigger }) => {
  const [selectedGenre, setSelectedGenre] = useState("all");

  const {
    loading: loadingAll,
    error: errorAll,
    data: dataAll,
    refetch,
  } = useQuery(ALL_BOOKS);

  const {
    loading: loadingFiltered,
    error: errorFiltered,
    data: dataFiltered,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
    skip: selectedGenre === "all",
  });

  useEffect(() => {
    if (refetchTrigger && show) {
      refetch();
    }
  }, [refetchTrigger, show, refetch]);

  if (loadingAll || loadingFiltered) return <p>Loading...</p>;
  if (errorAll || errorFiltered)
    return <p>Error: {errorAll?.message || errorFiltered?.message}</p>;

  const allBooks = dataAll ? dataAll.allBooks : [];
  const filteredBooks = dataFiltered ? dataFiltered.allBooks : [];

  const genres = Array.from(new Set(allBooks.flatMap((book) => book.genres)));

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {(selectedGenre === "all" ? allBooks : filteredBooks).map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            value={genre}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
        <button value="all" onClick={() => setSelectedGenre("all")}>
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
