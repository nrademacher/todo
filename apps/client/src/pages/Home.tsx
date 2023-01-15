import { useAuth, useCurrentUser } from "../hooks";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { PageLoadingSpinner, TodoForm, TodoList } from "../components";

export default function Home(): JSX.Element {
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const { signOut, isLoading: isAuthLoading } = useAuth();

  if (isUserLoading || isAuthLoading) {
    return <PageLoadingSpinner />;
  }

  return (
    <Container maxWidth="md">
      {user != null ? (
        <header>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <h1>Welcome, {user.username}!</h1>
            <Button variant="outlined" size="small" onClick={() => signOut()}>
              Sign out
            </Button>
          </Stack>
        </header>
      ) : null}
      <Stack spacing={2}>
        <TodoList />
        <TodoForm />
      </Stack>
    </Container>
  );
}
