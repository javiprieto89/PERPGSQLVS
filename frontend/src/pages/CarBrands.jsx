import { useEffect, useState } from "react";
import { carBrandOperations } from "../utils/graphqlClient";
import CarBrandCreate from "./CarBrandCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function CarBrands() {
    const [allCarBrands, setAllCarBrands] = useState([]);
    const [carBrands, setCarBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-carbrands') {
                loadCarBrands();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <CarBrandCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-carbrands', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nueva Marca de Auto'
        );
    };

    const handleFilterChange = (filtered) => {
        setCarBrands(filtered);
    };

    const handleEdit = (cb) => {
        openReactWindow(
            (popup) => (
                <CarBrandCreate
                    carBrand={cb}
                    onSave={() => {
                        popup.opener.postMessage('reload-carbrands', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Marca de Auto'
        );
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Borrar marca de auto?')) return;
        try {
            await carBrandOperations.deleteCarBrand(id);
            loadCarBrands();
        } catch (err) {
            alert('Error al borrar marca de auto: ' + err.message);
        }
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
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(cb)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(cb.CarBrandID)} className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
