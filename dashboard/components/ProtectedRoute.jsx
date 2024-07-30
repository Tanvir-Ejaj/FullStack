import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.value);

  if (userInfo.role !== "admin") {
    return <Navigate to="/not-authorized" />;
  }

  return children;
};

export default ProtectedRoute;
