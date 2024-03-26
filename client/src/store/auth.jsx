import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";

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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user,setUser]=useState("")
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  //JWT authentication :- to get the currently loggedin user data

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.ok){
        const data=await response.json()
        console.log("User data",data.userData)
        setUser(data.userData)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);
  return (
    <AuthContext.Provider value={{ storeTokenInLS, LogoutUser, isLoggedIn ,user}}>
      {children}
    </AuthContext.Provider>
  );
}
