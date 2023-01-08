import { useState } from "react";
import { useAuth } from "../hooks";
import type { CreateUserParams } from "../api";
import type { AxiosError } from "axios";
import { Link, Navigate } from "react-router-dom";

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
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignUp();
        }}
      >
        <div>
          <label htmlFor="username-input">Username</label>
          <input
            id="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password-input">Password</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={username === "" || email === "" || password === ""}
        >
          Sign up
        </button>
      </form>
      {errors.signUp !== null
        ? (
          <p style={{ color: "red" }}>
            {handleSubmitError((errors.signUp as AxiosError).response?.status)}
          </p>
        )
        : null}
      <Link to="/auth/signin">Sign in</Link>
    </div>
  );
}
