import type { Todo } from "./todo";
import { setAuthorization } from "./utils";
import { API_URL } from "../constants";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  todos: Todo[];
};

const USER_ROUTE_NAME = "users";

export async function getUsers(): Promise<User[] | null> {
  const authorization = setAuthorization();
  let result
  try {
    const res = await fetch(`${API_URL}/${USER_ROUTE_NAME}`, {
      headers: authorization,
    });
    result = await res.json();
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    return null;
  }
  return result;
}

export async function getCurrentUser(): Promise<User | null> {
  const authorization = setAuthorization();
  let result;
  try {
    const res = await fetch(`${API_URL}/${USER_ROUTE_NAME}/current`, {
      headers: authorization,
    });
    result = await res.json();
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    return null;
  }
  return result;
}

export async function getUserById(id: User["id"]): Promise<User | null> {
  const authorization = setAuthorization();
  let result;
  try {
    const res = await fetch(`${API_URL}/${USER_ROUTE_NAME}/${id}`, {
      headers: authorization,
    });
    result = await res.json();
  } catch (e) {
    console.error(e);
  }
  if (!result) {
    return null;
  }
  return result;
}

export type CreateUserParams =
  & Pick<User, "email" | "firstName" | "lastName">
  & { password: string };
export type UserAuthResponse = { token: string };

export async function createUser(
  params: CreateUserParams,
): Promise<UserAuthResponse | void> {
  try {
    const res = await fetch(`${API_URL}/${USER_ROUTE_NAME}`, {
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
