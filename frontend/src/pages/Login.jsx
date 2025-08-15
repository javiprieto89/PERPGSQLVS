import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUser } from "../hooks/useUser";
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
        userAccesses: result.user.UserAccess.map((access) => ({
          userID: access.UserID,
          companyID: access.CompanyID,
          companyName: access.Company,
          branchID: access.BranchID,
          branchName: access.Branch,
          roleID: access.RoleID,
          roleName: access.Role,
        })),
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
      setError(
        err.message || "Error al iniciar sesión. Verifique sus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="hidden md:flex items-center border-r-1 bg-card h-dvh w-1/2">
        <img src="./Site Stats-amico.svg" alt="illustration of dashboard" />
      </div>
      <div className="p-8 rounded-xl w-full md:w-1/2 h-dvh flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-2">ERP System</h1>
          <h2 className="text-muted-foreground">Iniciar sesión</h2>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              <p>{error}</p>
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-1/2">
          <div>
            <Label className="block mt-2 mb-1">Usuario</Label>
            <Input
              type="text"
              placeholder="Ingrese su usuario"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="username"
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label className="block mt-2 mb-1">Contraseña</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
              <Button
                variant="ghost"
                size="sm"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-1 top-1 hover:bg-transparent hover:border-color-transparent focus-visible:border-0"
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !nickname.trim() || !password.trim()}
            className="w-full"
            variant="primary"
          >
            {loading ? (
              <>
                <LoaderCircle
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            ¿Problemas para acceder?{" "}
            <button
              type="button"
              className="text-primary hover:text-foreground/80 font-medium"
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
