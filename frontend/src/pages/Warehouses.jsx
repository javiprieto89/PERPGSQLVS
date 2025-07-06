// frontend/src/pages/Warehouses.jsx
import { useEffect, useState } from "react";
import { warehouseOperations } from "../utils/graphqlClient";
import WarehouseCreate from "./WarehouseCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function Warehouses() {
    const [allWare, setAllWare] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadWarehouses(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-warehouses') {
                loadWarehouses();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadWarehouses = async () => {
        try {
            setLoading(true);
            const data = await warehouseOperations.getAllWarehouses();
            setAllWare(data);
            setWarehouses(data);
        } catch (err) {
            console.error("Error cargando depósitos:", err);
            setError(err.message);
            setWarehouses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <WarehouseCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-warehouses', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Depósito'
        );
    };

    const handleFilterChange = (filtered) => {
        setWarehouses(filtered);
    };

    const handleEdit = (wh) => {
        openReactWindow(
            (popup) => (
                <WarehouseCreate
                    warehouse={wh}
                    onSave={() => {
                        popup.opener.postMessage('reload-warehouses', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Depósito'
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Depósitos</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadWarehouses}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nuevo Depósito
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="warehouses"
                        data={allWare}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {warehouses.map(wh => (
                        <div key={wh.WarehouseID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{wh.Name}</h3>
                            <p className="text-sm mb-2">{wh.Description}</p>
                            <p className="text-sm mb-2">Activo: {wh.IsActive ? 'Sí' : 'No'}</p>
                            <button onClick={() => handleEdit(wh)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
