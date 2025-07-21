// frontend/src/pages/StockEntry.jsx
import React, { useState, useEffect } from "react";
import ItemSearchModal from "../components/ItemSearchModal";
import { warehouseOperations, tempStockOperations } from "../utils/graphqlClient";
import { useUser } from "../hooks/useUser";

export default function StockEntry({ onClose, windowRef }) {
    const { userInfo } = useUser();
    const [sessionId] = useState(() => crypto.randomUUID());
    const [warehouses, setWarehouses] = useState([]);
    const [entries, setEntries] = useState([]);
    const [showItemSearch, setShowItemSearch] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [warehouseId, setWarehouseId] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        warehouseOperations.getAllWarehouses().then(setWarehouses);
    }, []);

    const loadEntries = async () => {
        const data = await tempStockOperations.getSessionEntries(sessionId);
        setEntries(data);
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
        setShowItemSearch(false);
    };

    const handleAdd = async () => {
        if (!selectedItem || !warehouseId || !quantity) return;
        const data = {
            SessionID: sessionId,
            CompanyID: userInfo?.companyId || 1,
            BranchID: userInfo?.branchId || 1,
            UserID: userInfo?.userId || 1,
            ItemID: selectedItem.itemID || selectedItem.ItemID,
            WarehouseID: parseInt(warehouseId),
            Quantity: parseInt(quantity),
            Reason: reason,
        };
        await tempStockOperations.createEntry(data);
        setSelectedItem(null);
        setQuantity(1);
        setWarehouseId("");
        setReason("");
        loadEntries();
    };

    const handleProcess = async () => {
        await tempStockOperations.processSession(sessionId);
        windowRef.close();
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Ingreso de Stock</h1>
            <button
                onClick={() => setShowItemSearch(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                Buscar Ítem
            </button>
            {selectedItem && (
                <div className="space-y-2 border p-4 rounded">
                    <h3 className="font-medium">
                        {selectedItem.description || selectedItem.Description}
                    </h3>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="border px-2 py-1 rounded w-24"
                        />
                        <select
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}
                            className="border px-2 py-1 rounded"
                        >
                            <option value="">Depósito...</option>
                            {warehouses.map((w) => (
                                <option key={w.WarehouseID} value={w.WarehouseID}>
                                    {w.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Motivo"
                        className="border px-2 py-1 rounded w-full"
                    />
                    <button
                        onClick={handleAdd}
                        className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
                    >
                        Agregar
                    </button>
                </div>
            )}
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
        </div>
    );
}
