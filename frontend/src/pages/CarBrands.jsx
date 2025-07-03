import { useEffect, useState } from "react";
import { carBrandOperations } from "../utils/graphqlClient";
import CarBrandCreate from "./CarBrandCreate";
import TableFilters from "../components/TableFilters";

export default function CarBrands() {
    const [allCarBrands, setAllCarBrands] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingCarBrand, setEditingCarBrand] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadCarBrands(); }, []);

    const loadCarBrands = async () => {
        try {
            setLoading(true);
            const data = await carBrandOperations.getAllCarBrands();
            setAllCarBrands(data);
            setCarBrands(data);
        } catch (err) {
            console.error("Error cargando marcas de auto:", err);
            setError(err.message);
            setCarBrands([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaved = () => {
        loadCarBrands();
        setShowModal(false);
        setEditingCarBrand(null);
    };

    const handleCreate = () => {
        setEditingCarBrand(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => {
        setCarBrands(filtered);
    };

    const handleEdit = (cb) => {
        setEditingCarBrand(cb);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Marcas de Auto</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadCarBrands}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Marca
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="carbrands"
                        data={allCarBrands}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {carBrands.map(cb => (
                        <div key={cb.CarBrandID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{cb.Name}</h3>
                            <button onClick={() => handleEdit(cb)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <CarBrandCreate
                            onClose={() => { setShowModal(false); setEditingCarBrand(null); }}
                            onSave={handleSaved}
                            carBrand={editingCarBrand}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
