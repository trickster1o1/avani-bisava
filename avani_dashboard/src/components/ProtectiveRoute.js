import React from "react";

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectiveRoute = ({ children, redirectTo }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  // const getUserId = localStorage.getItem("userId");
  const { adminInfo } = adminLogin;
  const isAuthenticated = adminInfo && adminInfo.success;
  // const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default ProtectiveRoute;
