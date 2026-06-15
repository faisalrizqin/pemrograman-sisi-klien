import { Navigate } from "react-router-dom";
import { useAuthStateContext } from "@/Utils/Contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthStateContext();

  const isLoggedIn = localStorage.getItem("user");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;