import { useState, useEffect } from "react";
import { itemSubcategoryOperations, itemCategoryOperations } from "../utils/graphqlClient";

export default function ItemSubcategoryCreate({ onClose, onSave, subcategory: initialSubcategory = null }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await itemCategoryOperations.getAllItemCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error cargando categorías:", err);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (initialSubcategory) {
            setIsEdit(true);
            setName(initialSubcategory.SubcategoryName || "");
            setCategoryId(initialSubcategory.ItemCategoryID || "");
        }
    }, [initialSubcategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let result;
            if (isEdit) {
                result = await itemSubcategoryOperations.updateItemSubcategory(initialSubcategory.ItemSubcategoryID, {
                    ItemCategoryID: parseInt(categoryId),
                    SubcategoryName: name
                });
            } else {
                result = await itemSubcategoryOperations.createItemSubcategory({
                    ItemCategoryID: parseInt(categoryId),
                    SubcategoryName: name
                });
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando subcategoría:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Subcategoría' : 'Nueva Subcategoría'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Categoría</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    >
                        <option value="">Seleccione</option>
                        {categories.map(cat => (
                            <option key={cat.ItemCategoryID} value={cat.ItemCategoryID}>{cat.CategoryName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !name.trim() || !categoryId}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
