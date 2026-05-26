import { useState } from "react";
import authContext from "./authContext.js";

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  return (
    <authContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </authContext.Provider>
  );
}
