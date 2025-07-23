// frontend/src/pages/Branches.jsx
import { useEffect, useState } from "react";
import { branchOperations } from "../utils/graphqlClient";
import BranchCreate from "./BranchCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function Branches() {
    const [allBranches, setAllBranches] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadBranches(); }, []);

    const loadBranches = async () => {
        try {
            setLoading(true);
            const data = await branchOperations.getAllBranches();
            setAllBranches(data);
            setBranches(data);
        } catch (err) {
            console.error("Error cargando sucursales:", err);
            setError(err.message);
            setBranches([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-branches') {
                loadBranches();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <BranchCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-branches', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nueva Sucursal'
        );
    };

    const handleFilterChange = (filtered) => setBranches(filtered);

    const handleEdit = (br) => {
        openReactWindow(
            (popup) => (
                <BranchCreate
                    branch={br}
                    onSave={() => {
                        popup.opener.postMessage('reload-branches', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Sucursal'
        );
    };

    const handleDelete = async (id, companyID) => {
        if (!confirm('¿Borrar sucursal?')) return;
        try {
            await branchOperations.deleteBranch(companyID, id);
            loadBranches();
        } catch (err) {
            alert('Error al borrar sucursal: ' + err.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Sucursales</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button onClick={loadBranches} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Sucursal
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters modelName="branches" data={allBranches} onFilterChange={handleFilterChange} />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {branches.map((br) => (
                        <div key={br.BranchID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{br.Name}</h3>
                            <p className="text-sm mb-2">Empresa ID: {br.CompanyID}</p>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(br)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(br.BranchID, br.CompanyID)} className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
