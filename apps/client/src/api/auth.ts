import type { CreateUserParams, UserAuthResponse } from "./user";
import { API_URL } from "../constants";

const AUTH_ROUTE_NAME = "auth";

export type SignInUserParams = Pick<CreateUserParams, "email" | "password">;

export async function signInUser(
  params: SignInUserParams,
): Promise<UserAuthResponse | void> {
  try {
    const res = await fetch(`${API_URL}/${AUTH_ROUTE_NAME}/signin`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}
