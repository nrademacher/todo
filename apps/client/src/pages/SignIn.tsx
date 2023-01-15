import { useState } from "react";
import { useAuth } from "../hooks";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import type { SignInUserParams } from "../api";
import { Link as RouterLink, Navigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { ErrorAlert, PageLoadingSpinner } from "../components";
import { APP_NAME } from "../constants";

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSignedIn, signIn, errors } = useAuth();

  const theme = useTheme();

  function resetForm(): void {
    setEmail("");
    setPassword("");
  }

  async function handleSignIn(): Promise<void> {
    const signUpParams: SignInUserParams = {
      email,
      password,
    };
    await signIn(signUpParams);
    resetForm();
  }

  function createErrorMessage(statusCode: number | undefined): {
    title: string;
    description: string;
  } {
    let title;
    let description;
    if (statusCode === 403) {
      title = "Invalid credentials";
      description = "Your email or password was incorrect";
    } else {
      title = "Error";
      description =
        "An error occurred while trying to sign you in. Please try again later.";
    }
    return { title, description };
  }

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container maxWidth="xs">
      <Stack
        sx={{
          width: "100%",
          margin: "auto",
          alignItems: "center",
          paddingTop: "4rem",
        }}
      >
        <header>
          <Stack sx={{ alignItems: "center" }}>
            <Box sx={{ fontSize: "4em" }}>☑️</Box>
            <h1>Sign in to {APP_NAME}</h1>
          </Stack>
        </header>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSignIn();
          }}
          style={{ width: "100%" }}
        >
          <Stack spacing={2} sx={{ alignItems: "center" }}>
            <Stack
              spacing={2}
              sx={{ width: "100%" }}
              border={1}
              borderColor="border.tertiary"
              borderRadius={1}
              padding={3}
              bgcolor="background.secondary"
            >
              <TextField
                label="Email"
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    "& > fieldset": {
                      borderColor: theme.palette.border.tertiary,
                    },
                  },
                  bgcolor: theme.palette.background.input,
                }}
              />
              <TextField
                label="Password"
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    "& > fieldset": {
                      borderColor: theme.palette.border.tertiary,
                    },
                  },
                  bgcolor: theme.palette.background.input,
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={email === "" || password === ""}
              >
                Sign in
              </Button>
            </Stack>
            {errors.signIn !== null ? (
              <ErrorAlert
                message={createErrorMessage(
                  (errors.signIn as AxiosError).response?.status
                )}
              />
            ) : null}
            <Box>
              Need an account?{" "}
              <RouterLink to="/signup" style={{ textDecoration: "none" }}>
                <Link underline="hover" component="span">
                  Sign up
                </Link>
              </RouterLink>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
