import { useEffect, useState } from "react";
import { carModelOperations } from "../utils/graphqlClient";
import CarModelCreate from "./CarModelCreate";
import TableFilters from "../components/TableFilters";

export default function CarModels() {
    const [allModels, setAllModels] = useState([]);
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadModels(); }, []);

    const loadModels = async () => {
        try {
            setLoading(true);
            const data = await carModelOperations.getAllCarModels();
            setAllModels(data);
            setModels(data);
        } catch (err) {
            console.error("Error cargando modelos de auto:", err);
            setError(err.message);
            setModels([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaved = () => {
        loadModels();
        setShowModal(false);
        setEditing(null);
    };

    const handleCreate = () => {
        setEditing(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => setModels(filtered);

    const handleEdit = (m) => {
        setEditing(m);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Modelos de Auto</h1>
                <div className="flex space-x-2">
                    <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button onClick={loadModels} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Recargar</button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Nuevo Modelo</button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters modelName="carmodels" data={allModels} onFilterChange={handleFilterChange} />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {models.map(m => (
                        <div key={m.CarModelID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{m.Model}</h3>
                            <p className="text-sm mb-2">Marca ID: {m.CarBrandID}</p>
                            <button onClick={() => handleEdit(m)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <CarModelCreate onClose={() => { setShowModal(false); setEditing(null); }} onSave={handleSaved} carModel={editing} />
                    </div>
                </div>
            )}
        </div>
    );
}
