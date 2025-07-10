// frontend/src/pages/RolesUsers.jsx
import { useEffect, useState } from "react";
import { userAccessOperations } from "../utils/graphqlClient";

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
                        <li key={idx} className="border p-2 rounded">
                            Usuario: {r.UserID} - Compañía: {r.CompanyID} - Sucursal: {r.BranchID} - Rol: {r.RoleID}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={loadData}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Recargar
            </button>
        </div>
    );
}
