import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({
  userInfo,
  selectedAccess,
  onChange,
  onLogout,
  companies,
  branches,
  roles,
}) {
  const navigate = useNavigate();

  console.log("HEADER props:", {
    userInfo,
    selectedAccess,
    companies,
    branches,
    roles,
  });
  return (
    <header className="flex justify-between items-center p-4 bg-gray-200 border-b">
      <div>
        <p>
          <strong>Nombre:</strong> {userInfo?.fullname || "Usuario"}
        </p>
        <div className="flex gap-4 mt-2 text-sm">
          <label>
            Compañía:
            <select
              name="company"
              value={selectedAccess.company}
              onChange={onChange}
              className="ml-1 border rounded px-2 py-1"
            >
              <option value="">-- Seleccionar --</option>
              {companies.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sucursal:
            <select
              name="branch"
              value={selectedAccess.branch}
              onChange={onChange}
              className="ml-1 border rounded px-2 py-1"
            >
              <option value="">-- Seleccionar --</option>
              {branches.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label>
            Rol:
            <select
              name="Role"
              value={selectedAccess.Role}
              onChange={onChange}
              className="ml-1 border rounded px-2 py-1"
            >
              <option value="">-- Seleccionar --</option>
              {roles.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        title="Volver al Dashboard"
        className="text-blue-600 hover:text-blue-800"
      >
        <Home className="w-6 h-6" />
      </button>

      <button
        onClick={onLogout}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
