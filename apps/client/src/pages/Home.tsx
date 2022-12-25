import { useAuth, useCurrentUser } from "../hooks";
import { TodoForm, TodoList } from "../components";

export function Home() {
  const { user } = useCurrentUser()
  const { signOut } = useAuth();

  return (
    <div>
      {user
        ? (
          <header>
            <h1>Welcome, {user.firstName}!</h1>
            <button onClick={() => signOut()}>Sign out</button>
          </header>
        )
        : null}
      <TodoList />
      <TodoForm />
    </div>
  );
}