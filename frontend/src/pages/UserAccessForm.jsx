// frontend/src/pages/UserAccessForm.jsx
import { useState, useEffect } from "react";
import { userAccessOperations } from "../utils/graphqlClient";

export default function UserAccessForm({ onClose, onSave, record: initialRecord = null }) {
    const [userID, setUserID] = useState("");
    const [companyID, setCompanyID] = useState("");
    const [branchID, setBranchID] = useState("");
    const [roleID, setRoleID] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (initialRecord) {
            setIsEdit(true);
            setUserID(initialRecord.UserID);
            setCompanyID(initialRecord.CompanyID);
            setBranchID(initialRecord.BranchID);
            setRoleID(initialRecord.RoleID);
        }
    }, [initialRecord]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let result;
            if (isEdit) {
                result = await userAccessOperations.update(
                    {
                        oldUserID: initialRecord.UserID,
                        oldCompanyID: initialRecord.CompanyID,
                        oldBranchID: initialRecord.BranchID,
                        oldRoleID: initialRecord.RoleID
                    },
                    { UserID: parseInt(userID), CompanyID: parseInt(companyID), BranchID: parseInt(branchID), RoleID: parseInt(roleID) }
                );
            } else {
                result = await userAccessOperations.create({
                    UserID: parseInt(userID),
                    CompanyID: parseInt(companyID),
                    BranchID: parseInt(branchID),
                    RoleID: parseInt(roleID)
                });
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando asignación:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Asignación' : 'Nueva Asignación'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">UserID</label>
                    <input type="number" value={userID} onChange={e => setUserID(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">CompanyID</label>
                    <input type="number" value={companyID} onChange={e => setCompanyID(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">BranchID</label>
                    <input type="number" value={branchID} onChange={e => setBranchID(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">RoleID</label>
                    <input type="number" value={roleID} onChange={e => setRoleID(e.target.value)} className="w-full border p-2 rounded" required />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Guardando...' : 'Guardar'}</button>
                </div>
            </form>
        </div>
    );
}
