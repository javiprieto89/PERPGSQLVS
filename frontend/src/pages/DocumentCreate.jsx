// frontend/src/pages/DocumentCreate.jsx
import { useState, useEffect } from "react";
import { documentOperations, companyOperations, branchOperations, documentTypeOperations } from "../utils/graphqlClient";

export default function DocumentCreate({ onClose, onSave, document: initialDoc = null }) {
    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [docTypes, setDocTypes] = useState([]);

    const [companyID, setCompanyID] = useState("");
    const [branchID, setBranchID] = useState("");
    const [documentTypeID, setDocumentTypeID] = useState("");
    const [description, setDescription] = useState("");
    const [documentNumber, setDocumentNumber] = useState("");
    const [pointOfSale, setPointOfSale] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [testing, setTesting] = useState(false);
    const [shouldAccount, setShouldAccount] = useState(false);
    const [movesStock, setMovesStock] = useState(false);
    const [isFiscal, setIsFiscal] = useState(false);
    const [isElectronic, setIsElectronic] = useState(false);
    const [isManual, setIsManual] = useState(false);
    const [isQuotation, setIsQuotation] = useState(false);
    const [maxItems, setMaxItems] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [comp, br, types] = await Promise.all([
                    companyOperations.getAllCompanies(),
                    branchOperations.getAllBranches(),
                    documentTypeOperations.getAllDocumenttypes(),
                ]);
                setCompanies(comp);
                setBranches(br);
                setDocTypes(types);
            } catch (err) {
                console.error("Error cargando datos:", err);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (initialDoc) {
            setIsEdit(true);
            setCompanyID(initialDoc.CompanyID || "");
            setBranchID(initialDoc.BranchID || "");
            setDocumentTypeID(initialDoc.DocumentTypeID || "");
            setDescription(initialDoc.Description || "");
            setDocumentNumber(initialDoc.DocumentNumber || "");
            setPointOfSale(initialDoc.PointOfSale || "");
            setIsActive(initialDoc.IsActive !== false);
            setTesting(initialDoc.Testing || false);
            setShouldAccount(initialDoc.ShouldAccount || false);
            setMovesStock(initialDoc.MovesStock || false);
            setIsFiscal(initialDoc.IsFiscal || false);
            setIsElectronic(initialDoc.IsElectronic || false);
            setIsManual(initialDoc.IsManual || false);
            setIsQuotation(initialDoc.IsQuotation || false);
            setMaxItems(initialDoc.MaxItems || "");
        }
    }, [initialDoc]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                CompanyID: parseInt(companyID),
                BranchID: parseInt(branchID),
                DocumentTypeID: parseInt(documentTypeID),
                Description: description,
                DocumentNumber: documentNumber ? parseInt(documentNumber) : null,
                PointOfSale: pointOfSale ? parseInt(pointOfSale) : null,
                IsActive: isActive,
                Testing: testing,
                ShouldAccount: shouldAccount,
                MovesStock: movesStock,
                IsFiscal: isFiscal,
                IsElectronic: isElectronic,
                IsManual: isManual,
                IsQuotation: isQuotation,
                MaxItems: maxItems ? parseInt(maxItems) : null,
            };
            let result;
            if (isEdit) {
                result = await documentOperations.updateDocument(initialDoc.DocumentID, payload);
            } else {
                result = await documentOperations.createDocument(payload);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando documento:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 overflow-y-auto h-full">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Documento' : 'Nuevo Documento'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Compañía</label>
                    <select value={companyID} onChange={e => setCompanyID(e.target.value)} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {companies.map(c => <option key={c.CompanyID} value={c.CompanyID}>{c.Name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Sucursal</label>
                    <select value={branchID} onChange={e => setBranchID(e.target.value)} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {branches.map(b => <option key={b.BranchID} value={b.BranchID}>{b.Name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tipo de Documento</label>
                    <select value={documentTypeID} onChange={e => setDocumentTypeID(e.target.value)} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {docTypes.map(dt => (
                            <option key={dt.DocumentTypeID} value={dt.DocumentTypeID}>{dt.Name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Descripción</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Número</label>
                        <input type="number" value={documentNumber} onChange={e => setDocumentNumber(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Punto de venta</label>
                        <input type="number" value={pointOfSale} onChange={e => setPointOfSale(e.target.value)} className="w-full border p-2 rounded" />
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={isActive} onChange={e => setIsActive(e.target.checked)} />Activo</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={testing} onChange={e => setTesting(e.target.checked)} />Prueba</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={shouldAccount} onChange={e => setShouldAccount(e.target.checked)} />Contabiliza</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={movesStock} onChange={e => setMovesStock(e.target.checked)} />Mueve stock</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={isFiscal} onChange={e => setIsFiscal(e.target.checked)} />Fiscal</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={isElectronic} onChange={e => setIsElectronic(e.target.checked)} />Electrónico</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={isManual} onChange={e => setIsManual(e.target.checked)} />Manual</label>
                    <label className="inline-flex items-center"><input type="checkbox" className="mr-2" checked={isQuotation} onChange={e => setIsQuotation(e.target.checked)} />Cotización</label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Máx ítems</label>
                    <input type="number" value={maxItems} onChange={e => setMaxItems(e.target.value)} className="w-full border p-2 rounded" />
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={loading || !companyID || !branchID || !documentTypeID} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Guardando...' : 'Guardar'}</button>
                </div>
            </form>
        </div>
    );
}
