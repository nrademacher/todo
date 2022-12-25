import { useAuth, useCurrentUser, useUser } from "../hooks";
import { TodoForm, TodoList } from "../components";

export function Home() {
  const { user: currentUser } = useCurrentUser()
  const { user } = useUser("7f5de170-837f-45aa-b645-3e002b2e8828")
  const { signOut } = useAuth();

  return (
    <div>
      {currentUser && user
        ? (
          <header>
            <h1>Welcome, {currentUser.firstName} and {user.firstName}!</h1>
            <button onClick={() => signOut()}>Sign out</button>
          </header>
        )
        : null}
      <TodoList />
      <TodoForm />
    </div>
  );
}
