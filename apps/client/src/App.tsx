import { useState } from "react";
import useSWR from "swr";
import reactLogo from "./assets/react.svg";
import "./App.css";

async function getTodos() {
  try {
    const res = await fetch("http://localhost:3004/todos");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

async function getUsers() {
  try {
    const res = await fetch("http://localhost:3004/users");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

function Todos() {
  const { data, error, isLoading } = useSWR("todos", getTodos);

  if (!data) {
    return null;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((todo: string) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
}

function Users() {
  const { data, error, isLoading } = useSWR("users", getUsers);

  if (!data) {
    return null;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Todos />
      <Users />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
