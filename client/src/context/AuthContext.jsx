// UserContext.js

import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(undefined);
  const login = (token) => {
    setJwtToken(token);
  };
  useEffect(() => {
  }, [jwtToken]);

  const logout = (err = null) => {
    setJwtToken(null);
    Cookies.remove("token");
    toast.success("Logged Out ", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    <Navigate to={"/login"} />;
  };

  return (
    <AuthContext.Provider value={{ jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
