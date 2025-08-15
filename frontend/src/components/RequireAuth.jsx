// src/components/RequireAuth.jsx
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  //YO const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");

  if (!token) {
    // sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
