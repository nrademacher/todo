import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AUTH_TOKEN_NAME } from "../constants";
import {
  type UseMutateAsyncFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createUser,
  type CreateUserParams,
  signInUser,
  type SignInUserParams,
  type UserAuthResponse,
} from "../api";

export interface UseAuthResult {
  errors: {
    signUp: unknown;
    signIn: unknown;
  };
  isLoading: boolean;
  signUp: UseMutateAsyncFunction<
    UserAuthResponse,
    unknown,
    CreateUserParams,
    unknown
  >;
  signIn: UseMutateAsyncFunction<
    UserAuthResponse,
    unknown,
    SignInUserParams,
    unknown
  >;
  getAuthToken: () => string | undefined;
  isSignedIn: boolean;
  signOut: () => void;
}

export function useAuth(): UseAuthResult {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleSignInSuccess(data: UserAuthResponse): Promise<void> {
    const { token } = data;
    Cookies.set(AUTH_TOKEN_NAME, token);
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
    navigate("/");
  }

  const signUp = useMutation({
    mutationFn: createUser,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await handleSignInSuccess(data);
    },
  });

  const signIn = useMutation({
    mutationFn: signInUser,
    onSuccess: async (data) => {
      await handleSignInSuccess(data);
    },
  });

  function getAuthToken(): string | undefined {
    return Cookies.get(AUTH_TOKEN_NAME);
  }

  function isSignedIn(): boolean {
    return typeof getAuthToken() === "string";
  }

  function signOut(): void {
    Cookies.remove(AUTH_TOKEN_NAME);
    navigate("/auth/signin");
  }

  return {
    errors: { signIn: signIn.error, signUp: signUp.error },
    isLoading: signIn.isLoading || signUp.isLoading,
    signUp: signUp.mutateAsync,
    signIn: signIn.mutateAsync,
    getAuthToken,
    isSignedIn: isSignedIn(),
    signOut,
  };
}
