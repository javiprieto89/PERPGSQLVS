// src/components/RedirectHome.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "~/utils/authHelper";

export default function RedirectHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = AuthHelper.getToken();
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
