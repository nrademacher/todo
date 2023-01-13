import { useState } from "react";
import { useAuth } from "../hooks";
import type { CreateUserParams } from "../api";
import type { AxiosError } from "axios";
import { Link, Navigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

export function SignUp(): JSX.Element {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, isSignedIn, errors } = useAuth();

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

  function handleSubmitError(statusCode: number | undefined): string {
    if (statusCode === 400) {
      return "Invalid credentials. Password must be at least 8 characters, contain upper and lower case characters, at least 1 number, and at least 1 special character.";
    } else if (statusCode === 409) {
      return "User already exists for given email";
    } else {
      return "Invalid credentials";
    }
  }

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container>
      <h1>Sign Up</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignUp();
        }}
      >
        <Grid container spacing={2} direction="column">
          <Grid xs={12} sm={8} md={4}>
            <TextField
              label="Username"
              id="username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </Grid>
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
              disabled={username === "" || email === "" || password === ""}
            >
              Sign up
            </Button>
          </Grid>
          <Grid xs={12} sm={8} md={4}>
            <Link to="/auth/signin">
              <Button>Sign in</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
      {errors.signUp !== null ? (
        <p style={{ color: "red" }}>
          {handleSubmitError((errors.signUp as AxiosError).response?.status)}
        </p>
      ) : null}
    </Container>
  );
}
