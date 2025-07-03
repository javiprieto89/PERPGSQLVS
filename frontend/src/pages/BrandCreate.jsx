import { useState, useEffect } from "react";
import { brandOperations } from "../utils/graphqlClient";

export default function BrandCreate({ onClose, onSave, brand: initialBrand = null }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (initialBrand) {
            setIsEdit(true);
            setName(initialBrand.Name || "");
        }
    }, [initialBrand]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let result;
            if (isEdit) {
                result = await brandOperations.updateBrand(initialBrand.BrandID, { Name: name });
            } else {
                result = await brandOperations.createBrand({ Name: name });
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando marca:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Marca' : 'Nueva Marca'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="text-right">
                    <button
                        type="submit"
                        disabled={loading || !name.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
