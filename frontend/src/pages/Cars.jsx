import { useEffect, useState } from "react";
import { carOperations } from "../utils/graphqlClient";
import CarCreate from "./CarCreate";
import TableFilters from "../components/TableFilters";

export default function Cars() {
    const [allCars, setAllCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadCars(); }, []);

    const loadCars = async () => {
        try {
            setLoading(true);
            const data = await carOperations.getAllCars();
            setAllCars(data);
            setCars(data);
        } catch (err) {
            console.error("Error cargando autos:", err);
            setError(err.message);
            setCars([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaved = () => {
        loadCars();
        setShowModal(false);
        setEditing(null);
    };

    const handleCreate = () => {
        setEditing(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => setCars(filtered);

    const handleEdit = (c) => {
        setEditing(c);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Autos</h1>
                <div className="flex space-x-2">
                    <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button onClick={loadCars} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Recargar</button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Nuevo Auto</button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters modelName="cars" data={allCars} onFilterChange={handleFilterChange} />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map(c => (
                        <div key={c.CarID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{c.LicensePlate}</h3>
                            <p className="text-sm mb-1">Año: {c.Year || '—'}</p>
                            <p className="text-sm mb-1">Modelo ID: {c.CarModelID}</p>
                            <button onClick={() => handleEdit(c)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <CarCreate onClose={() => { setShowModal(false); setEditing(null); }} onSave={handleSaved} car={editing} />
                    </div>
                </div>
            )}
        </div>
    );
}
