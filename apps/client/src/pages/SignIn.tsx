import { AxiosError } from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { SignInUserParams } from "../api";
import { useAuth } from "../hooks";

export function SignIn(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isSignedIn, signIn, errors } = useAuth();

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

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSignIn();
        }}
      >
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
        <button type="submit" disabled={email === "" || password === ""}>
          Sign in
        </button>
      </form>
      {errors.signIn !== null
        ? (
          <p style={{ color: "red" }}>
            {handleSubmitError((errors.signIn as AxiosError).response?.status)}
          </p>
        )
        : null}
      <Link to="/signup">Sign up</Link>
    </div>
  );
}
