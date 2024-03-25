import React, { createContext, useContext } from "react";

const AuthContext = createContext();
//custom API's

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside the provider!!");
  }
  return authContextValue;
};

export function AuthProvider({ children }) {
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
  };
  return (
    <AuthContext.Provider value={{ storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
}
