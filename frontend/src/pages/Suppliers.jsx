import { useEffect, useState } from "react";
import { graphqlClient, QUERIES, diagnosticGraphQL } from "../utils/graphqlClient";
import SupplierCreate from "./SupplierCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

function SupplierDetails({ supplier, onClose }) {
    if (!supplier) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4">
                <h2 className="text-xl font-bold">Detalles del Proveedor</h2>
                <div className="space-y-1 text-sm">
                    <p><strong>Nombre:</strong> {supplier.FirstName} {supplier.LastName}</p>
                    <p><strong>Email:</strong> {supplier.Email || '—'}</p>
                    <p><strong>Teléfono:</strong> {supplier.Phone || '—'}</p>
                    <p><strong>Dirección:</strong> {supplier.Address || '—'}</p>
                    <p><strong>Documento:</strong> {supplier.DocNumber || '—'}</p>
                    <p><strong>Activo:</strong> {supplier.IsActive ? 'Sí' : 'No'}</p>
                </div>
                <div className="text-right mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Suppliers() {
    const [allSuppliers, setAllSuppliers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    useEffect(() => {
        loadSuppliers();
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-suppliers') {
                loadSuppliers();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadSuppliers = async () => {
        try {
            setLoading(true);
            setError(null);
            setDebugInfo("Iniciando carga de proveedores...");
            const isConnected = await graphqlClient.checkConnection();
            if (!isConnected) {
                throw new Error("No se puede conectar al servidor GraphQL. Verifica que esté ejecutándose en http://127.0.0.1:8000");
            }
            const data = await graphqlClient.query(QUERIES.GET_ALL_SUPPLIERS);
            setDebugInfo(`Consulta exitosa. Proveedores encontrados: ${data?.allSuppliers?.length || 0}`);
            if (data && data.allSuppliers) {
                setAllSuppliers(data.allSuppliers);
                setSuppliers(data.allSuppliers);
            } else {
                setAllSuppliers([]);
                setSuppliers([]);
            }
            setError(null);
            setDebugInfo(null);
        } catch (err) {
            console.error("Error cargando proveedores:", err);
            setError(err.message);
            setDebugInfo(`Error: ${err.message}`);
            setAllSuppliers([]);
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    const runDiagnostic = async () => {
        setDebugInfo("Ejecutando diagnóstico completo...");
        const result = await diagnosticGraphQL();
        setDebugInfo(result ? "Diagnóstico exitoso" : "Diagnóstico falló - revisa la consola");
    };

    const handleCreateSupplier = () => {
        openReactWindow(
            (popup) => (
                <SupplierCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-suppliers', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Proveedor'
        );
    };

    const handleEditSupplier = (supplier) => {
        openReactWindow(
            (popup) => (
                <SupplierCreate
                    supplier={supplier}
                    onSave={() => {
                        popup.opener.postMessage('reload-suppliers', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Proveedor'
        );
    };

    const handleViewDetails = (supplier) => {
        setSelectedSupplier(supplier);
    };

    const handleFilterChange = (filtered) => {
        setSuppliers(filtered);
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Proveedores</h1>
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600">Cargando...</span>
                    </div>
                </div>
                {debugInfo && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <p className="text-blue-800 text-sm">{debugInfo}</p>
                    </div>
                )}
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1,2,3,4,5,6].map(i => (
                            <div key={i} className="bg-gray-200 h-32 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Proveedores</h1>
                <div className="flex space-x-2">
                    <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button onClick={runDiagnostic} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                        Diagnóstico
                    </button>
                    <button onClick={loadSuppliers} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        Recargar
                    </button>
                    <button onClick={handleCreateSupplier} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Nuevo Proveedor
                    </button>
                </div>
            </div>
            {showFilters && (
                <div className="mb-6">
                    <TableFilters modelName="suppliers" data={allSuppliers} onFilterChange={handleFilterChange} />
                </div>
            )}
            {debugInfo && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <p className="text-blue-800 text-sm">{debugInfo}</p>
                    </div>
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="text-red-800 font-semibold mb-1">Error cargando proveedores</h4>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}
            {!error && suppliers.length > 0 && (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-gray-600">Mostrando {suppliers.length} proveedor{suppliers.length !== 1 ? 'es' : ''}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suppliers.map((supplier) => (
                            <div key={supplier.SupplierID} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{supplier.FirstName} {supplier.LastName}</h3>
                                        <p className="text-sm text-gray-600">ID: {supplier.SupplierID}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${supplier.IsActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{supplier.IsActive ? 'Activo' : 'Inactivo'}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {supplier.Email && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <span className="text-gray-700 truncate">{supplier.Email}</span>
                                        </div>
                                    )}
                                    {supplier.Phone && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span className="text-gray-700">{supplier.Phone}</span>
                                        </div>
                                    )}
                                    {supplier.Address && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 truncate">{supplier.Address}</span>
                                        </div>
                                    )}
                                    {supplier.DocNumber && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Doc: {supplier.DocNumber}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                                    <button onClick={() => handleViewDetails(supplier)} className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                                        Ver Detalles
                                    </button>
                                    <button onClick={() => handleEditSupplier(supplier)} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {!error && !loading && suppliers.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay proveedores</h3>
                    <p className="mt-1 text-sm text-gray-500">Comienza creando tu primer proveedor.</p>
                    <div className="mt-6">
                        <button onClick={handleCreateSupplier} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Crear Primer Proveedor
                        </button>
                    </div>
                </div>
            )}
            {selectedSupplier && (
                <SupplierDetails supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />
            )}
        </div>
    );
}
