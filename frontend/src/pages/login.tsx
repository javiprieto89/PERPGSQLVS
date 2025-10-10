import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import z from "zod/v4";
import { passwordSchema } from "~/lib/zod";
import { Referrer } from "~/utils/referrer.session";


import { ErrorMessage } from "~/components/form/ErrorMessage";
import { FormBlock } from "~/components/form/FormBlock";
import { InputPassword } from "~/components/form/InputPassword";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/form/Input";
import { useUser } from "~/hooks/useUser";

export default function Login() {
  const formSchema = z.object({
    username: z.string().min(1, { message: "Required" }),
    password: passwordSchema
  });

  type FormSchema = z.infer<typeof formSchema>;

  const defaultValues: FormSchema = {
    username: "",
    password: ""
  };

  const navigate = useNavigate();
  const { login, loading, error } = useUser();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues,
  });

  const onSuccess = async () => {
    await navigate(Referrer.getOnce());
  };

  const handleSubmit = async (data: FormSchema) => {
    await login(data.username.trim(), data.password.trim());
    await navigate(Referrer.getOnce());
  };

  const handleForgotPassword = () => {
    toast.error("Contacte al administrador del sistema");
  };

  console.log({ error });


  return (
    <>
      <DevTool control={form.control} placement='bottom-left' />
      <div className="flex">
        <Toaster />
        <div className="hidden lg:flex items-center border-r-1 bg-card h-dvh w-1/2">
          <img src="./Site Stats-amico.svg" alt="illustration of dashboard" className="max-w-[350px] m-auto" />
        </div>
        <div className="p-8 rounded-xl w-full lg:w-1/2 h-dvh flex flex-col items-center justify-center">
          <div className="text-center mb-8 mx-auto">
            <h1 className="text-xl font-bold mb-2">ERP System</h1>
            <h2 className="text-muted-foreground">Iniciar sesión</h2>
          </div>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2 w-full max-w-[460px]">
            <FormBlock className='w-full'>
              {loading && <AlertLoading />}
              {error && <ApiErrorMessage error={error} />}
              <Input
                label="Usuario"
                {...form.register("username")}
                type="text"
                placeholder="Ingrese su usuario"
                autoComplete="username"
                error={form.formState.errors.username?.message}
                required
              />
            </FormBlock>

            <FormBlock className="w-full mb-4">
              <InputPassword
                label="Contraseña"
                {...form.register("password")}
                placeholder="Ingrese su contraseña"
                autoComplete="password"
                className="w-full"
                required
              />
              <ErrorMessage error={form.formState.errors.password?.message} />
            </FormBlock>

            <FormBlock className="w-full space-y-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
                variant="primary"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </Button>

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
            </FormBlock>
          </form>
        </div>
      </div>
    </>
  );
}
