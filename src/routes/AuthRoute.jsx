import { useContext } from "react";
import authContext from "../context/authContext/authContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const { token } = useContext(authContext);

  if (token) {
    return <Navigate to={"/"} />;
  }
  return children;
}
