import { useState } from "react";
import { useAuth } from "../hooks";
import type { CreateUserParams } from "../api";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuth();

  function resetForm(): void {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  async function handleSignUp(): Promise<void> {
    try {
      const signUpParams: CreateUserParams = {
        firstName,
        lastName,
        email,
        password,
      };
      await signUp(signUpParams);
      resetForm();
    } catch (e) {
      // @TODO: Error handling
      console.error(e);
    }
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
          <label htmlFor="first-name-input">First Name</label>
          <input
            id="first-name-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name-input">Last Name</label>
          <input
            id="last-name-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          disabled={!firstName || !lastName || !email || !password}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
