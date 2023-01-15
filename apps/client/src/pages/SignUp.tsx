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
import type { CreateUserParams } from "../api";
import { Link as RouterLink, Navigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { APP_NAME } from "../constants";
import {
  ErrorAlert,
  PageLoadingSpinner,
  PrereleaseDisclaimer,
} from "../components";

export default function SignUp(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, signUp, isSignedIn, errors } = useAuth();

  const theme = useTheme();

  function resetForm(): void {
    setUsername("");
    setEmail("");
    setPassword("");
  }

  async function handleSignUp(): Promise<void> {
    const signUpParams: CreateUserParams = {
      username,
      email,
      password,
    };
    await signUp(signUpParams);
    resetForm();
  }

  function createErrorMessage(statusCode: number | undefined): {
    title: string;
    description: string;
  } {
    let title;
    let description;
    if (statusCode === 400) {
      title = "Insufficient password strength";
      description =
        "Password must be at least 8 characters, contain upper and lower case characters, at least 1 number, and at least 1 special character.";
    } else if (statusCode === 409) {
      title = "User exists";
      description = "A user already exists for the email address you provided.";
    } else {
      title = "Error";
      description =
        "Sorry, an internal error occurred while trying to sign you up. Please try again later.";
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
            <h1>Sign up for {APP_NAME}</h1>
          </Stack>
        </header>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <PrereleaseDisclaimer />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSignUp();
            }}
            style={{ width: "100%" }}
          >
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
                label="Username"
                id="username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                disabled={username === "" || email === "" || password === ""}
              >
                Sign up
              </Button>
            </Stack>
          </form>
          {errors.signUp !== null
            ? (
              <ErrorAlert
                message={createErrorMessage(
                  (errors.signUp as AxiosError).response?.status,
                )}
              />
            )
            : null}
          <Box>
            Already have an account?{" "}
            <RouterLink to="/auth/signin" style={{ textDecoration: "none" }}>
              <Link underline="hover" component="span">
                Sign in
              </Link>
            </RouterLink>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
