import React, { Suspense, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const ProtectedRoutes = () => {
  const { jwtToken } = useAuth();
  if (jwtToken === undefined) {
    return <Loading />;
  }
  return jwtToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
