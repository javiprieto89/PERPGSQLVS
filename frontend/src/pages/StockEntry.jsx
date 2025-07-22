// frontend/src/pages/StockEntry.jsx
import React, { useState, useEffect } from "react";
import ItemSearchModal from "../components/ItemSearchModal";
import ItemConfirmationModal from "../components/ItemConfirmationModal";
import CompanySearchModal from "../components/CompanySearchModal";
import BranchSearchModal from "../components/BranchSearchModal";
import { warehouseOperations, tempStockOperations, companyOperations, branchOperations } from "../utils/graphqlClient";
import { useUser } from "../hooks/useUser";

export default function StockEntry({ onClose, windowRef }) {
    const { userInfo } = useUser();
    const [sessionId] = useState(() => crypto.randomUUID());
    const [warehouses, setWarehouses] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);
    const [entries, setEntries] = useState([]);
    const [showItemSearch, setShowItemSearch] = useState(false);
    const [showItemConfirm, setShowItemConfirm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [companyID, setCompanyID] = useState(userInfo?.companyId || "");
    const [branchID, setBranchID] = useState(userInfo?.branchId || "");
    const [showCompanyModal, setShowCompanyModal] = useState(false);
    const [showBranchModal, setShowBranchModal] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        warehouseOperations.getAllWarehouses().then(setWarehouses);
        companyOperations.getAllCompanies().then(setCompanies);
        branchOperations.getAllBranches().then(setBranches);
    }, []);

    const loadEntries = async () => {
        const data = await tempStockOperations.getSessionEntries(sessionId);
        setEntries(data);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadEntries();
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setShowItemSearch(false);
        setShowItemConfirm(true);
    };

    const handleConfirmItem = async (details) => {
        if (!selectedItem) return;
        const data = {
            SessionID: sessionId,
            CompanyID: parseInt(companyID),
            BranchID: parseInt(branchID),
            UserID: userInfo?.userId || 1,
            ItemID: selectedItem.itemID || selectedItem.ItemID,
            WarehouseID: parseInt(details.warehouseId),
            Quantity: parseInt(details.quantity || quantity),
        };
        await tempStockOperations.createEntry(data);
        setSelectedItem(null);
        setShowItemConfirm(false);
        setQuantity(1);
        setWarehouseID("");
        loadEntries();
    };


    const handleProcess = async () => {
        await tempStockOperations.processSession(sessionId);
        windowRef.close();
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Ingreso de Stock</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Compañía</label>
                    <div className="flex space-x-2 items-center">
                        <select value={companyID} onChange={e => setCompanyID(e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Seleccione</option>
                            {companies.map(c => (
                                <option key={c.CompanyID} value={c.CompanyID}>{c.Name}</option>
                            ))}
                        </select>
                        <div className="relative w-32">
                            <input value={''} readOnly className="border p-2 rounded pl-7 w-full" />
                            <button type="button" onClick={() => setShowCompanyModal(true)} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Sucursal</label>
                    <div className="flex space-x-2 items-center">
                        <select value={branchID} onChange={e => setBranchID(e.target.value)} className="w-full border p-2 rounded">
                            <option value="">Seleccione</option>
                            {branches.filter(b => !companyID || b.CompanyID === parseInt(companyID)).map(b => (
                                <option key={b.BranchID} value={b.BranchID}>{b.Name}</option>
                            ))}
                        </select>
                        <div className="relative w-32">
                            <input value={''} readOnly className="border p-2 rounded pl-7 w-full" />
                            <button type="button" onClick={() => setShowBranchModal(true)} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => setShowItemSearch(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Buscar Ítem
            </button>
            {entries.length > 0 && (
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-2">Ítem</th>
                            <th className="px-2">Depósito</th>
                            <th className="px-2">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((e) => (
                            <tr key={e.TempStockEntryID} className="border-t">
                                <td className="px-2">{e.ItemID}</td>
                                <td className="px-2">
                                    {warehouses.find((w) => w.WarehouseID === e.WarehouseID)?.Name || e.WarehouseID}
                                </td>
                                <td className="px-2">{e.Quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="flex justify-end gap-2">
                <button
                    onClick={handleProcess}
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                    Guardar
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancelar
                </button>
            </div>
            {showItemSearch && (
                <ItemSearchModal
                    isOpen={true}
                    onClose={() => setShowItemSearch(false)}
                    onItemSelect={handleSelectItem}
                />
            )}
            {showItemConfirm && selectedItem && (
                <ItemConfirmationModal
                    isOpen={true}
                    item={selectedItem}
                    onClose={() => setShowItemConfirm(false)}
                    onConfirm={handleConfirmItem}
                    warehouses={warehouses}
                />
            )}
            {showCompanyModal && (
                <CompanySearchModal
                    isOpen={true}
                    onClose={() => setShowCompanyModal(false)}
                    onSelect={(c) => {
                        setCompanyID(c.CompanyID);
                        setShowCompanyModal(false);
                    }}
                />
            )}
            {showBranchModal && (
                <BranchSearchModal
                    isOpen={true}
                    companyID={companyID}
                    onClose={() => setShowBranchModal(false)}
                    onSelect={(b) => {
                        setBranchID(b.BranchID);
                        setShowBranchModal(false);
                    }}
                />
            )}
        </div>
    );
}
