import { useState } from "react";
import authContext from "./authContext.js";

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

 
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
