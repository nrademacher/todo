import type { Todo } from "./todo";
import { setAuthorization } from "./utils";
import { API_URL } from "../constants";
import axios from "axios";

export interface User {
  id: string;
  username: string;
  email: string;
  todos: Todo[];
}

const USER_ROUTE_NAME = "user";

export async function getUsers(): Promise<User[] | null> {
  const res = await axios.get(`${API_URL}/${USER_ROUTE_NAME}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export async function getCurrentUser(): Promise<User> {
  const res = await axios.get(`${API_URL}/${USER_ROUTE_NAME}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export type CreateUserParams = Pick<User, "email" | "username"> & {
  password: string;
};
export interface UserAuthResponse {
  token: string;
}

export async function createUser(
  params: CreateUserParams
): Promise<UserAuthResponse> {
  const res = await axios.post(`${API_URL}/${USER_ROUTE_NAME}`, params, {
    headers: setAuthorization(),
  });
  return res.data;
}
