import { createContext } from "react";
import type { UseAuthResult } from "../hooks";

export const AuthContext = createContext<UseAuthResult>({} as UseAuthResult);
