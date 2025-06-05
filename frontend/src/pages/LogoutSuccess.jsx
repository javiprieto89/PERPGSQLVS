import { Link } from "react-router-dom";

export default function LogoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Sesión cerrada correctamente
        </h1>
        <p className="mt-3 text-gray-600">
          Cerraste sesión con éxito. Podés volver a iniciar sesión cuando
          quieras.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Volver al login
        </Link>
      </div>
    </div>
  );
}
