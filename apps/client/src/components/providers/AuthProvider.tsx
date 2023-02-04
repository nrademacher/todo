import { useAuth } from "../../hooks";
import { AuthContext } from "../../contexts";

/**
 * React context provider for the authorization values and methods.
 * Routes that require authorization need to be wrapped with this.
 */
export const AuthProvider: React.FC<React.PropsWithChildren> = (
  { children },
) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
