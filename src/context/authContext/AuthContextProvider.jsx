import { useState } from "react";
import authContext from "./authContext.js";

export default function AuthContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || null;
  });

  return (
    <authContext.Provider value={{ userId, setUserId, isLogin, setIsLogin }}>
      {children}
    </authContext.Provider>
  );
}
