import { useAuth, useCurrentUser } from "../hooks";
import { TodoForm, TodoList } from "../components";

export function Home(): JSX.Element {
  const { user } = useCurrentUser();
  const { signOut } = useAuth();

  return (
    <div>
      {user != null ? (
        <header>
          <h1>Welcome, {user.username}!</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </header>
      ) : null}
      <TodoList />
      <TodoForm />
    </div>
  );
}
