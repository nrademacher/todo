import Cookies from "js-cookie";
import { AUTH_TOKEN_NAME } from "../constants";

export function setAuthorization() {
  const requestHeaders: Record<string, string> = {};
  const authToken = Cookies.get(AUTH_TOKEN_NAME);
  if (authToken) {
    requestHeaders["Authorization"] = `Bearer ${authToken}`;
  }
  return requestHeaders;
}
