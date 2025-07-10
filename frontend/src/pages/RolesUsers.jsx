// frontend/src/pages/RolesUsers.jsx
import { useEffect, useState } from "react";
import { userAccessOperations } from "../utils/graphqlClient";
import UserAccessForm from "./UserAccessForm";
import { openReactWindow } from "../utils/openReactWindow";

export default function RolesUsers() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await userAccessOperations.getAllUserAccess();
            setRecords(data);
        } catch (err) {
            console.error("Error cargando asignaciones:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-useraccess') {
                loadData();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <UserAccessForm
                    onSave={() => {
                        popup.opener.postMessage('reload-useraccess', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nueva Asignación'
        );
    };

    const handleEdit = (record) => {
        openReactWindow(
            (popup) => (
                <UserAccessForm
                    record={record}
                    onSave={() => {
                        popup.opener.postMessage('reload-useraccess', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Asignación'
        );
    };

    const handleDelete = async (record) => {
        if (!confirm('¿Borrar asignación?')) return;
        try {
            await userAccessOperations.delete({
                userID: record.UserID,
                companyID: record.CompanyID,
                branchID: record.BranchID,
                roleID: record.RoleID
            });
            loadData();
        } catch (err) {
            alert('Error al borrar asignación: ' + err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Roles y Usuarios</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <ul className="space-y-2">
                    {records.map((r, idx) => (
                        <li key={idx} className="border p-2 rounded flex justify-between items-center">
                            <span>
                                Usuario: {r.UserID} - Compañía: {r.CompanyID} - Sucursal: {r.BranchID} - Rol: {r.RoleID}
                            </span>
                            <span className="space-x-2">
                                <button onClick={() => handleEdit(r)} className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(r)} className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 space-x-2">
                <button
                    onClick={loadData}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Recargar
                </button>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Nueva Asignación
                </button>
            </div>
        </div>
    );
}
