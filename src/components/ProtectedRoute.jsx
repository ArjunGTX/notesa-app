import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const {
    auth: { isLoggedIn },
  } = useAuth();

  useEffect(() => isLoggedIn || navigate("/login"));

  return <>{children}</>;
};
