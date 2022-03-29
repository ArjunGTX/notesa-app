import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    userId: localStorage.getItem("userId"),
    isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
    encodedToken: localStorage.getItem("encodedToken"),
  });

  useEffect(() => {
    localStorage.setItem("userId", auth.userId);
    localStorage.setItem("isLoggedIn", auth.isLoggedIn);
    localStorage.setItem("encodedToken", auth.encodedToken);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
