import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { Eye, EyeOff } from "lucide-react";
import { AuthHelper } from "../utils/authHelper";

export default function Login() {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Usar AuthHelper para el login
            const result = await AuthHelper.login(nickname, password);

            if (!result.success) {
                throw new Error(result.message || "Credenciales inválidas");
            }

            // Adaptar la respuesta al formato esperado por UserContext
            const data = {
                UserID: result.user.UserID,
                Nickname: result.user.Nickname,
                FullName: result.user.FullName,
                IsActive: result.user.IsActive,
                userAccesses: result.user.UserAccess.map(access => ({
                    userID: access.UserID,
                    companyID: access.CompanyID,
                    companyName: access.Company,
                    branchID: access.BranchID,
                    branchName: access.Branch,
                    roleID: access.RoleID,
                    roleName: access.Role
                }))
            };

            // Actualizar contexto
            login(data);

            // Verificar si hay una redirección pendiente
            const redirectPath = sessionStorage.getItem("redirectAfterLogin");
            if (redirectPath) {
                sessionStorage.removeItem("redirectAfterLogin");
                navigate(redirectPath);
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Error login:", err);
            setError(err.message || "Error al iniciar sesión. Verifique sus credenciales.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">ERP System</h1>
                    <h2 className="text-xl text-gray-600">Iniciar sesión</h2>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Usuario
                        </label>
                        <input
                            type="text"
                            placeholder="Ingrese su usuario"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            autoComplete="username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                autoComplete="current-password"
                                required
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                                tabIndex={-1}
                                disabled={loading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !nickname.trim() || !password.trim()}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Iniciando sesión...
                            </>
                        ) : (
                            "Iniciar sesión"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Problemas para acceder?{" "}
                        <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                            onClick={() => setError("Contacte al administrador del sistema")}
                        >
                            Contactar soporte
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}