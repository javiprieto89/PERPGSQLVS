// src/components/RedirectHome.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
