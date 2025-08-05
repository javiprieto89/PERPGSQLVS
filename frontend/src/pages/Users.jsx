// frontend/src/pages/Users.jsx
import { useEffect, useState } from "react";
import { userOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import UserForm from "./UserForm";

export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userOperations.getAllUsers();
      setAllUsers(data);
      setUsers(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-users") {
        loadUsers();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleFilterChange = (filtered) => {
    setUsers(filtered);
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <UserForm
          onSave={() => {
            popup.opener.postMessage("reload-users", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Usuario"
    );
  };

  const handleEdit = (user) => {
    openReactWindow(
      (popup) => (
        <UserForm
          user={user}
          onSave={() => {
            popup.opener.postMessage("reload-users", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Usuario"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar usuario?")) return;
    try {
      await userOperations.deleteUser(id);
      loadUsers();
    } catch (err) {
      alert("Error al borrar usuario: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadUsers}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Nuevo Usuario
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="users"
            data={allUsers}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.UserID}
              className="border p-2 rounded flex justify-between items-center"
            >
              <span>
                <strong>{u.FullName}</strong> ({u.Nickname}) - ID: {u.UserID}
              </span>
              <span className="space-x-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(u.UserID)}
                  className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
