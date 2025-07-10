// frontend/src/pages/Users.jsx
import { useEffect, useState } from "react";
import { userOperations } from "../utils/graphqlClient";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await userOperations.getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error("Error cargando usuarios:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadUsers(); }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Usuarios</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <ul className="space-y-2">
                    {users.map((u) => (
                        <li key={u.UserID} className="border p-2 rounded">
                            <strong>{u.FullName}</strong> ({u.Nickname}) - ID:{" "}
                            {u.UserID}
                        </li>
                    ))}
                </ul>
            )}
            <button
                onClick={loadUsers}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Recargar
            </button>
        </div>
    );
}
