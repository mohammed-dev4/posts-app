import { useContext } from "react";
import authContext from "../context/authContext/authContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLogin } = useContext(authContext);

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
