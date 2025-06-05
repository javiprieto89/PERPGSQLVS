import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import apiFetch from "../utils/apiFetch";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: {
          nickname,
          password,
        },
      });

      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("user_info", JSON.stringify(data.user));
      sessionStorage.setItem(
        "access_data",
        JSON.stringify(data.user.userAccesses)
      );

      if (data.user.userAccesses?.length) {
        sessionStorage.setItem(
          "selected_access",
          JSON.stringify(data.user.userAccesses[0])
        );
      }

      login(data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error login:", err);
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border p-2 mb-3 w-full rounded"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 pr-10 w-full rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
