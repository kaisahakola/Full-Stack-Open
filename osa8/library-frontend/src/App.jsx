import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [favoriteGenre, setFavoriteGenre] = useState(null);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const client = useApolloClient();
  const {
    data: userData,
    error: userError,
    loading: userLoading,
  } = useQuery(ME);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    if (userData && userData.me && userData.me.favoriteGenre) {
      setUser(userData.me);
      setFavoriteGenre(userData.me.favoriteGenre);
    }
  }, [userData]);

  const handleBooksPageOpen = () => {
    setTriggerRefetch(true);
    setPage("books");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setFavoriteGenre(null);
    localStorage.removeItem("library-user-token");
    client.resetStore();
  };

  if (!user && !token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={handleBooksPageOpen}>books</button>
          <button onClick={() => setPage("login")}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />

        <Authors show={page === "authors"} displayEditAuthorForm={false} />

        <Books show={page === "books"} refetchTrigger={triggerRefetch} />

        <LoginForm show={page === "login"} setToken={setToken} />
      </div>
    );
  }

  if (userLoading && !user) return <p>Loading...</p>;
  if (userError) {
    notify(userError.message);
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={handleBooksPageOpen}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} displayEditAuthorForm={true} />

      <Books show={page === "books"} refetchTrigger={triggerRefetch} />

      <NewBook
        show={page === "add"}
        onNewBookAdded={() => setTriggerRefetch(false)}
      />

      <Recommendations
        show={page === "recommend"}
        favoriteGenre={favoriteGenre}
      />
    </div>
  );
};

export default App;
