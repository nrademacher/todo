import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

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

async function createUser(arg) {
  fetch("http://localhost:3004/users", {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function createTodo(arg) {
  await fetch("http://localhost:3004/todos", {
    method: "POST",
    body: JSON.stringify(arg),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function Todos() {
  const { data, error, isLoading } = useSWR("todos", getTodos, );
  const { mutate } = useSWRConfig()

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
    <>
      <ul>
        {data.map((todo, i) => <li key={i}>{todo.description}</li>)}
      </ul>
      <button
        onClick={async () => {
          try {
            const newTodo = {
              description: "Buy coffee",
            };
            await createTodo(newTodo);
            mutate("todos", [...data, newTodo]);
          } catch (e) {
            // error handling
            throw e;
          }
        }}
      >
        Create todo
      </button>
    </>
  );
}

function Users() {
  const { data, error, isLoading } = useSWR("users", getUsers);
  const { trigger, isMutating } = useSWRMutation(
    "http://localhost:3004/users",
    createUser,
  );

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
    <>
      <ul>
        {data.map((user: any) => <li key={user.id}>{user.firstName}</li>)}
      </ul>
      <button
        disabled={isMutating}
        onClick={async () => {
          try {
            await trigger({
              firstName: "john",
              lastName: "doe",
              email: "john@doe.com",
            });
          } catch (e) {
            // error handling
            throw e;
          }
        }}
      >
        Create user
      </button>
    </>
  );
}

function App() {
  return (
    <div>
      <Todos />
      <Users />
    </div>
  );
}

export default App;
