import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AUTH_TOKEN_NAME } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, signInUser, type UserAuthResponse } from "../api";

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function handleSignInSuccess(data: UserAuthResponse): void {
    const { token } = data;
    Cookies.set(AUTH_TOKEN_NAME, token);
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    navigate("/");
  }

  const signUp = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      handleSignInSuccess(data as UserAuthResponse);
    },
  });

  const signIn = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      handleSignInSuccess(data as UserAuthResponse);
    },
  });

  function getAuthToken(): string | undefined {
    return Cookies.get(AUTH_TOKEN_NAME);
  }

  function isSignedIn(): boolean {
    return !!getAuthToken();
  }

  function signOut(): void {
    Cookies.remove(AUTH_TOKEN_NAME);
    navigate("/auth/signin");
  }

  return {
    error: signIn.error || signUp.error,
    isLoading: signIn.isLoading || signUp.error,
    signUp: signUp.mutateAsync,
    signIn: signIn.mutateAsync,
    getAuthToken,
    isSignedIn: isSignedIn(),
    signOut,
  };
}
