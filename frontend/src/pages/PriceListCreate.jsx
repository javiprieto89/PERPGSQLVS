// frontend/src/pages/PriceListCreate.jsx
import { useState, useEffect } from "react";
import { pricelistOperations } from "../utils/graphqlClient";

export default function PriceListCreate({ onClose, onSave, pricelist: initialPL = null }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (initialPL) {
            setIsEdit(true);
            setName(initialPL.Name || "");
            setDescription(initialPL.Description || "");
            setIsActive(initialPL.IsActive !== false);
        }
    }, [initialPL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = { Name: name, Description: description, IsActive: isActive };
            let result;
            if (isEdit) {
                result = await pricelistOperations.updatePricelist(initialPL.PriceListID, payload);
            } else {
                result = await pricelistOperations.createPricelist(payload);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando lista:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Lista' : 'Nueva Lista'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" className="mr-2" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                        <span>Activo</span>
                    </label>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                        Cancelar
                    </button>
                    <button type="submit" disabled={loading || !name.trim()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
