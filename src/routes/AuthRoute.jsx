import { useContext } from "react";
import authContext from "../context/authContext/authContext";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const { isLogin } = useContext(authContext);

  if (isLogin) {
    return <Navigate to={"/"} />;
  }
  return children;
}
