import { useAuth } from "../hooks";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};
