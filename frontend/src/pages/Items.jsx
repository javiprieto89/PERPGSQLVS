import { useEffect, useState } from "react";
import { itemOperations } from "../utils/graphqlClient";
import ItemCreate from "./ItemCreate";
import TableFilters from "../components/TableFilters";

export default function Items() {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadItems(); }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await itemOperations.getAllItems();
            setAllItems(data);
            setItems(data);
        } catch (err) {
            console.error("Error cargando ítems:", err);
            setError(err.message);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleItemSaved = () => {
        loadItems();
        setShowModal(false);
        setEditingItem(null);
    };

    const handleCreate = () => {
        setEditingItem(null);
        setShowModal(true);
    };

    const handleFilterChange = (filtered) => {
        setItems(filtered);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowModal(true);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Ítems</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadItems}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nuevo Ítem
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="items"
                        data={allItems}
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(it => (
                        <div key={it.ItemID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{it.Description}</h3>
                            <p className="text-sm mb-2">Código: {it.Code}</p>
                            <button onClick={() => handleEdit(it)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                        </div>
                    ))}
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                        <ItemCreate
                            onClose={() => { setShowModal(false); setEditingItem(null); }}
                            onSave={handleItemSaved}
                            item={editingItem}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
