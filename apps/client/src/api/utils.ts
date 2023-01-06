import Cookies from "js-cookie";
import { AUTH_TOKEN_NAME } from "../constants";

export function setAuthorization(): Record<string, string> {
  const requestHeaders: Record<string, string> = {};
  const authToken = Cookies.get(AUTH_TOKEN_NAME);
  if (typeof authToken === "string") {
    requestHeaders.Authorization = `Bearer ${authToken}`;
  }
  return requestHeaders;
}
