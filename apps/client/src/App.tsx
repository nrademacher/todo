import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoForm, TodoList } from "./components";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <TodoForm />
    </QueryClientProvider>
  );
}
