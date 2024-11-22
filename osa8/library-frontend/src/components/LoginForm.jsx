/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN, ME } from "../queries";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setError, setToken } = props;
  const client = useApolloClient();

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      client.refetchQueries({ include: [ME] });
    },
  });

  const submit = async (event) => {
    event.preventDefault();
    await login({ variables: { username, password } });
  };

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
