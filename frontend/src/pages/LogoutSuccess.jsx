import { Link } from "react-router-dom";

export default function LogoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className=" p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Sesión cerrada correctamente
        </h1>
        <p className="mt-3 text-muted-foreground">
          Cerraste sesión con éxito. Podés volver a iniciar sesión cuando
          quieras.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary transition"
        >
          Volver al login
        </Link>
      </div>
    </div>
  );
}
