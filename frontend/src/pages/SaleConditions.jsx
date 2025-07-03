import { useEffect, useState } from "react";
import { saleConditionOperations } from "../utils/graphqlClient";
import SaleConditionCreate from "./SaleConditionCreate";
import TableFilters from "../components/TableFilters";

export default function SaleConditions() {
    const [allSaleConditions, setAllSaleConditions] = useState([]);
    const [saleConditions, setSaleConditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingSC, setEditingSC] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadSCs(); }, []);

    const loadSCs = async () => {
        try {
            setLoading(true);
            const data = await saleConditionOperations.getAllSaleConditions();
            setAllSaleConditions(data);
            setSaleConditions(data);
        } catch (err) {
            console.error("Error cargando condiciones:", err);
            setError(err.message);
            setSaleConditions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaved = () => {
        loadSCs();
        setShowModal(false);
        setEditingSC(null);
    };

    const handleCreate = () => {
        setEditingSC(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => {
        setSaleConditions(filtered);
    };

    const handleEdit = (sc) => {
        setEditingSC(sc);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Condiciones de Venta</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadSCs}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Condición
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="saleconditions"
                        data={allSaleConditions}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {saleConditions.map(sc => (
                        <div key={sc.SaleConditionID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{sc.Name}</h3>
                            <p className="text-sm">Tarjeta ID: {sc.CreditCardID}</p>
                            <p className="text-sm mb-1">Vencimiento: {sc.DueDate}</p>
                            <p className="text-sm mb-2">Activo: {sc.IsActive ? 'Sí' : 'No'}</p>
                            <button onClick={() => handleEdit(sc)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <SaleConditionCreate
                            onClose={() => { setShowModal(false); setEditingSC(null); }}
                            onSave={handleSaved}
                            saleCondition={editingSC}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
