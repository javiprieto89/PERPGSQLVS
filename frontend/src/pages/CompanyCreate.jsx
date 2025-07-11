// frontend/src/pages/CompanyCreate.jsx
import { useState, useEffect } from "react";
import { companyOperations } from "../utils/graphqlClient";

export default function CompanyCreate({ onClose, onSave, company: initialCompany = null }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cuit, setCuit] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (initialCompany) {
            setIsEdit(true);
            setName(initialCompany.Name || "");
            setAddress(initialCompany.Address || "");
            setCuit(initialCompany.CUIT || "");
        }
    }, [initialCompany]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = { Name: name, Address: address, CUIT: cuit };
            let result;
            if (isEdit) {
                result = await companyOperations.updateCompany(initialCompany.CompanyID, payload);
            } else {
                result = await companyOperations.createCompany(payload);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando compañía:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Empresa' : 'Nueva Empresa'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Dirección</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">CUIT</label>
                    <input type="text" value={cuit} onChange={(e) => setCuit(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={loading || !name.trim()} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
