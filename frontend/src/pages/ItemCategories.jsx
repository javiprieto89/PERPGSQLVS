import { useEffect, useState } from "react";
import { itemCategoryOperations } from "../utils/graphqlClient";
import ItemCategoryCreate from "./ItemCategoryCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function ItemCategories() {
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadCategories(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-itemcategories') {
                loadCategories();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const data = await itemCategoryOperations.getAllItemCategories();
            setAllCategories(data);
            setCategories(data);
        } catch (err) {
            console.error("Error cargando categorías:", err);
            setError(err.message);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };


    const handleCreate = () => {
        openReactWindow(
            () => (
                <ItemCategoryCreate
                    onSave={() => {
                        window.opener.postMessage('reload-itemcategories', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Nueva Categoría'
        );
    };

    const handleFilterChange = (filtered) => {
        setCategories(filtered);
    };

    const handleEdit = (category) => {
        openReactWindow(
            () => (
                <ItemCategoryCreate
                    category={category}
                    onSave={() => {
                        window.opener.postMessage('reload-itemcategories', '*');
                        window.close();
                    }}
                    onClose={() => window.close()}
                />
            ),
            'Editar Categoría'
        );
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadCategories}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nueva Categoría
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="itemcategories"
                        data={allCategories}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map(cat => (
                        <div key={cat.ItemCategoryID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{cat.CategoryName}</h3>
                            <button onClick={() => handleEdit(cat)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
