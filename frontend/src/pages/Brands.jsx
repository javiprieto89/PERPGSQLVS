import { useEffect, useState } from "react";
import { brandOperations } from "../utils/graphqlClient";
import BrandCreate from "./BrandCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function Brands() {
    const [allBrands, setAllBrands] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadBrands(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-brands') {
                loadBrands();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadBrands = async () => {
        try {
            setLoading(true);
            const data = await brandOperations.getAllBrands();
            setAllBrands(data);
            setBrands(data);
        } catch (err) {
            console.error("Error cargando marcas:", err);
            setError(err.message);
            setBrands([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <BrandCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-brands', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nueva Marca'
        );
    };

    const handleFilterChange = (filtered) => {
        setBrands(filtered);
    };

    const handleEdit = (brand) => {
        openReactWindow(
            (popup) => (
                <BrandCreate
                    brand={brand}
                    onSave={() => {
                        popup.opener.postMessage('reload-brands', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Marca'
        );
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Borrar marca?')) return;
        try {
            await brandOperations.deleteBrand(id);
            loadBrands();
        } catch (err) {
            alert('Error al borrar marca: ' + err.message);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Marcas</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadBrands}
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
                        modelName="brands"
                        data={allBrands}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brands.map(br => (
                        <div key={br.BrandID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{br.Name}</h3>
                            <p className="text-sm mb-2">Activo: {br.IsActive ? 'Sí' : 'No'}</p>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(br)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(br.BrandID)} className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
