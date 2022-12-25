import { useState } from "react";
import { SignInUserParams } from "../api";
import { useAuth } from "../hooks";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuth();

  function resetForm(): void {
    setEmail("");
    setPassword("");
  }

  async function handleSignIn(): Promise<void> {
    try {
      const signUpParams: SignInUserParams = {
        email,
        password,
      };
      await signIn(signUpParams);
      resetForm();
    } catch (e) {
      // @TODO: Error handling
      console.error(e);
    }
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
        <button
          type="submit"
          disabled={!email || !password}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
