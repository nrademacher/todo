import { AxiosError } from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignInUserParams } from "../api";
import { useAuth } from "../hooks";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

import { PageLoadingSpinner } from "../components";

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSignedIn, signIn, errors } = useAuth();

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

  function handleSubmitError(statusCode: number | undefined): string {
    if (statusCode === 403) {
      return "Invalid credentials";
    } else {
      return "An error occurred while trying to sign you in. Please try again later.";
    }
  }

  if (isLoading) {
    return <PageLoadingSpinner />;
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <h1>Sign In</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn();
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid xs={12} sm={8} md={4}>
            <TextField
              label="Email"
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={8} md={4}>
            <TextField
              label="Password"
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={12} sm={8} md={4}>
            <Button
              variant="contained"
              type="submit"
              disabled={email === "" || password === ""}
            >
              Sign in
            </Button>
          </Grid>
          <Grid xs={12} sm={8} md={4}>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
      {errors.signIn !== null ? (
        <p style={{ color: "red" }}>
          {handleSubmitError((errors.signIn as AxiosError).response?.status)}
        </p>
      ) : null}
    </Container>
  );
}
