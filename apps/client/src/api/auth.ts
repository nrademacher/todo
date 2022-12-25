import type { CreateUserParams, UserAuthResponse } from "./user";
import { API_URL } from "../constants";
import axios from "axios";

const AUTH_ROUTE_NAME = "auth";

export type SignInUserParams = Pick<CreateUserParams, "email" | "password">;

export async function signInUser(
  params: SignInUserParams,
): Promise<UserAuthResponse | void> {
  try {
    const res = await axios.post(
      `${API_URL}/${AUTH_ROUTE_NAME}/signin`,
      params,
    );
    return res.data;
  } catch (e) {
    throw e;
  }
}
