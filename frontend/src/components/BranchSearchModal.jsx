﻿// frontend/src/components/BranchSearchModal.jsx
import React, { useEffect, useState } from "react";
import { branchOperations } from "../utils/graphqlClient";
import TableFilters from "./TableFilters";

export default function BranchSearchModal({ isOpen, onClose, onSelect, companyID = null }) {
    const [branches, setBranches] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const data = companyID
                    ? await branchOperations.getBranchesByCompany(companyID)
                    : await branchOperations.getAllBranches();
                setBranches(data);
                setFiltered(data);
            } catch (err) {
                console.error("Error fetching branches:", err);
                setBranches([]);
                setFiltered([]);
            }
            setLoading(false);
        }
        if (isOpen) {
            setQuery("");
            setShowFilters(false);
            loadData();
        }
    }, [isOpen, companyID]);

    if (!isOpen) return null;

    const list = filtered.filter(b => (b.Name || "").toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
            <div className="relative mx-auto p-5 border w-full max-w-xl shadow-lg rounded-md bg-white space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                    <h3 className="text-xl font-semibold text-gray-700">Buscar Sucursal</h3>
                    <button onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex space-x-2">
                    <input type="text" value={query} onChange={e => setQuery(e.target.value)} className="flex-1 border rounded px-3 py-2" placeholder="Nombre..." />
                    <button type="button" onClick={() => setShowFilters(!showFilters)} className="px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                        {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
                    </button>
                </div>
                {showFilters && (
                    <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                        <TableFilters modelName="branches" data={branches} onFilterChange={setFiltered} />
                    </div>
                )}
                {loading ? (
                    <div className="flex justify-center py-8">Cargando...</div>
                ) : (
                    <div className="max-h-80 overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-4 py-2 text-left">ID</th>
                                    <th className="px-4 py-2 text-left">Nombre</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length > 0 ? (
                                    list.map(b => (
                                        <tr key={b.BranchID} className="hover:bg-gray-50" onDoubleClick={() => { onSelect(b); onClose(); }}>
                                            <td className="px-4 py-2">{b.BranchID}</td>
                                            <td className="px-4 py-2">{b.Name}</td>
                                            <td className="px-4 py-2">
                                                <button onClick={() => { onSelect(b); onClose(); }} className="text-blue-600 hover:underline">Seleccionar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-4 py-8 text-center text-gray-500">No se encontraron sucursales</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
