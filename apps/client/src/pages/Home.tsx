import { Container, Stack } from "@mui/material";
import { TodoForm, TodoList } from "../components";

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <TodoList />
        <TodoForm />
      </Stack>
    </Container>
  );
}
