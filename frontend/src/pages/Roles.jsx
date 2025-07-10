// frontend/src/pages/Roles.jsx
import { useEffect, useState } from "react";
import { roleOperations } from "../utils/graphqlClient";
import RoleForm from "./RoleForm";
import { openReactWindow } from "../utils/openReactWindow";

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadRoles = async () => {
        try {
            setLoading(true);
            const data = await roleOperations.getAllRoles();
            setRoles(data);
        } catch (err) {
            console.error("Error cargando roles:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadRoles(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-roles') {
                loadRoles();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <RoleForm
                    onSave={() => {
                        popup.opener.postMessage('reload-roles', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Rol'
        );
    };

    const handleEdit = (role) => {
        openReactWindow(
            (popup) => (
                <RoleForm
                    role={role}
                    onSave={() => {
                        popup.opener.postMessage('reload-roles', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Rol'
        );
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Borrar rol?')) return;
        try {
            await roleOperations.deleteRole(id);
            loadRoles();
        } catch (err) {
            alert('Error al borrar rol: ' + err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Roles</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <ul className="space-y-2">
                    {roles.map((r) => (
                        <li key={r.RoleID} className="border p-2 rounded flex justify-between items-center">
                            <span>
                                <strong>{r.RoleName}</strong> (ID: {r.RoleID})
                            </span>
                            <span className="space-x-2">
                                <button onClick={() => handleEdit(r)} className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(r.RoleID)} className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 space-x-2">
                <button
                    onClick={loadRoles}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Recargar
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Nuevo Rol
                </button>
            </div>
        </div>
    );
}
