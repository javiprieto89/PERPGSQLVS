import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUser } from "~/hooks/useUser";
import { AuthHelper } from "~/utils/authHelper";

export default function Login() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, loading, error } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(nickname.trim(), password.trim());
    const nav = AuthHelper.getRedirectAfterLogin();
    AuthHelper.removeRedirectAfterLogin();
    await navigate(nav);
  };

  const handleForgotPassword = () => {
    toast.error("Contacte al administrador del sistema");
  };

  return (
    <div className="flex">
      <Toaster />
      <div className="hidden lg:flex items-center border-r-1 bg-card h-dvh w-1/2">
        <img src="./Site Stats-amico.svg" alt="illustration of dashboard" />
      </div>
      <div className="p-8 rounded-xl w-full lg:w-1/2 h-dvh flex flex-col items-center justify-center">
        <div className="text-center mb-8 mx-auto">
          <h1 className="text-xl font-bold mb-2">ERP System</h1>
          <h2 className="text-muted-foreground">Iniciar sesión</h2>
        </div>

        {error && <ApiErrorMessage error={error} />}

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

          <div className="mb-4">
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
              onClick={handleForgotPassword}
            >
              Contactar soporte
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
