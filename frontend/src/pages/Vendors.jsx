// frontend/src/pages/Vendors.jsx
import { useEffect, useState } from "react";
import { vendorOperations } from "../utils/graphqlClient";
import VendorCreate from "./VendorCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function Vendors() {
    const [allVendors, setAllVendors] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => { loadVendors(); }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-vendors') {
                loadVendors();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadVendors = async () => {
        try {
            setLoading(true);
            const data = await vendorOperations.getAllVendors();
            setAllVendors(data);
            setVendors(data);
        } catch (err) {
            console.error("Error cargando vendedores:", err);
            setError(err.message);
            setVendors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <VendorCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-vendors', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Vendedor'
        );
    };

    const handleEdit = (vendor) => {
        openReactWindow(
            (popup) => (
                <VendorCreate
                    vendor={vendor}
                    onSave={() => {
                        popup.opener.postMessage('reload-vendors', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Vendedor'
        );
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Borrar vendedor?')) return;
        try {
            await vendorOperations.deleteVendor(id);
            loadVendors();
        } catch (err) {
            alert('Error al borrar vendedor: ' + err.message);
        }
    };

    const handleFilterChange = (filtered) => {
        setVendors(filtered);
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Vendedores</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadVendors}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Recargar
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Nuevo Vendedor
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters modelName="vendors" data={allVendors} onFilterChange={handleFilterChange} />
                </div>
            )}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            {loading ? (
                <div>Cargando...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vendors.map(v => (
                        <div key={v.VendorID} className="bg-white rounded shadow p-4">
                            <h3 className="text-lg font-semibold mb-2">{v.VendorName}</h3>
                            {v.Commission !== null && (
                                <p className="text-sm mb-1">Comisión: {v.Commission}</p>
                            )}
                            <p className="text-sm mb-2">Activo: {v.IsActive ? 'Sí' : 'No'}</p>
                            <div className="flex space-x-2">
                                <button onClick={() => handleEdit(v)} className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200">Editar</button>
                                <button onClick={() => handleDelete(v.VendorID)} className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
