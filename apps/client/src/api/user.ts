import type { Todo } from "./todo";
import { API_URL } from "../constants";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  todos: Todo[];
};

const USER_ROUTE_NAME = "users";

export async function getUsers(): Promise<User[] | undefined> {
  try {
    const res = await fetch(`${API_URL}/${USER_ROUTE_NAME}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export type UserParams = Pick<User, "email" | "firstName" | "lastName">;

export async function createUser(arg: UserParams): Promise<void> {
  try {
    await fetch(`${API_URL}/${USER_ROUTE_NAME}`, {
      method: "POST",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
  }
}
