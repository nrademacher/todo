import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./utils/query-client";

async function getTodos() {
  try {
    const res = await fetch("http://localhost:3004/");
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

function HelloWorld() {
  // Queries
  const query = useQuery({ queryKey: ["todos"], queryFn: getTodos });

  if (!query.data) {
    return null;
  }

  return (
    <ul>
      {query.data.map((todo: string) => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <HelloWorld />
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
    </QueryClientProvider>
  );
}

export default App;
