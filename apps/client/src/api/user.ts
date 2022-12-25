import type { Todo } from "./todo";
import { setAuthorization } from "./utils";
import { API_URL } from "../constants";
import axios from "axios";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  todos: Todo[];
};

const USER_ROUTE_NAME = "users";

export async function getUsers(): Promise<User[] | null> {
  const res = await axios.get(`${API_URL}/${USER_ROUTE_NAME}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export async function getCurrentUser(): Promise<User | null> {
  const res = await axios.get(`${API_URL}/${USER_ROUTE_NAME}/current`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export async function getUserById(id: User["id"]): Promise<User | null> {
  const res = await axios.get(`${API_URL}/${USER_ROUTE_NAME}/${id}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export type CreateUserParams =
  & Pick<User, "email" | "firstName" | "lastName">
  & { password: string };
export type UserAuthResponse = { token: string };

export async function createUser(
  params: CreateUserParams,
): Promise<UserAuthResponse | void> {
  const res = await axios.post(`${API_URL}/${USER_ROUTE_NAME}`, params, {
    headers: setAuthorization(),
  });
  return res.data;
}