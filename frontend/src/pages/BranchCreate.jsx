// frontend/src/pages/BranchCreate.jsx
import { useState, useEffect } from "react";
import { branchOperations, companyOperations } from "../utils/graphqlClient";

export default function BranchCreate({ onClose, onSave, branch: initialBranch = null }) {
    const [companies, setCompanies] = useState([]);
    const [companyID, setCompanyID] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const res = await companyOperations.getAllCompanies();
                setCompanies(res);
            } catch (err) {
                console.error("Error cargando compañías:", err);
            }
        };
        loadCompanies();
    }, []);

    useEffect(() => {
        if (initialBranch) {
            setIsEdit(true);
            setCompanyID(initialBranch.CompanyID || "");
            setName(initialBranch.Name || "");
            setAddress(initialBranch.Address || "");
            setPhone(initialBranch.Phone || "");
        }
    }, [initialBranch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                CompanyID: parseInt(companyID),
                Name: name,
                Address: address,
                Phone: phone,
            };
            let result;
            if (isEdit) {
                result = await branchOperations.updateBranch(initialBranch.BranchID, payload);
            } else {
                result = await branchOperations.createBranch(payload);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando sucursal:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Sucursal' : 'Nueva Sucursal'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Compañía</label>
                    <select
                        value={companyID}
                        onChange={(e) => setCompanyID(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Seleccione</option>
                        {companies.map((c) => (
                            <option key={c.CompanyID} value={c.CompanyID}>
                                {c.Name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Nombre</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Dirección</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Teléfono</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
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
                        disabled={loading || !companyID || !name.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>
    );
}
