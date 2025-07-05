import { useEffect, useState } from "react";
import { itemSubcategoryOperations } from "../utils/graphqlClient";
import ItemSubcategoryCreate from "./ItemSubcategoryCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function ItemSubcategories() {
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadSubcategories(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-itemsubcategories') {
                loadSubcategories();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadSubcategories = async () => {
        try {
            setLoading(true);
            const data = await itemSubcategoryOperations.getAllItemSubcategories();
            setAllSubcategories(data);
            setSubcategories(data);
        } catch (err) {
            console.error("Error cargando subcategorías:", err);
            setError(err.message);
            setSubcategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        openReactWindow(
            () => (
                <ItemSubcategoryCreate
                    onSave={() => {
                        window.opener.postMessage('reload-itemsubcategories', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Nueva Subcategoría'
        );
    };

    const handleFilterChange = (filtered) => {
        setSubcategories(filtered);
    };

    const handleEdit = (subcat) => {
        openReactWindow(
            () => (
                <ItemSubcategoryCreate
                    subcategory={subcat}
                    onSave={() => {
                        window.opener.postMessage('reload-itemsubcategories', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Editar Subcategoría'
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Subcategorías</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadSubcategories}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Subcategoría
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="itemsubcategories"
                        data={allSubcategories}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategories.map(sc => (
                        <div key={sc.ItemSubcategoryID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{sc.SubcategoryName}</h3>
                            <p className="text-sm mb-2">Categoría ID: {sc.ItemCategoryID}</p>
                            <button onClick={() => handleEdit(sc)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
