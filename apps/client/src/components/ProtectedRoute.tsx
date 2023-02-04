import { useContext } from "react";
import { AuthContext } from "../contexts";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element => {
  const { isSignedIn } = useContext(AuthContext);

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};
