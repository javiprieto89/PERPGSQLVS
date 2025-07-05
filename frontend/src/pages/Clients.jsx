import { useEffect, useState } from "react";
import { graphqlClient, QUERIES, diagnosticGraphQL } from "../utils/graphqlClient";
import ClientCreate from "./ClientCreate";
import { openReactWindow } from "../utils/openReactWindow";
import TableFilters from "../components/TableFilters";

// Modal simple para mostrar los datos del cliente seleccionado
function ClientDetails({ client, onClose }) {
    if (!client) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 space-y-4">
                <h2 className="text-xl font-bold">Detalles del Cliente</h2>
                <div className="space-y-1 text-sm">
                    <p><strong>Nombre:</strong> {client.FirstName} {client.LastName}</p>
                    <p><strong>Email:</strong> {client.Email || '—'}</p>
                    <p><strong>Teléfono:</strong> {client.Phone || '—'}</p>
                    <p><strong>Dirección:</strong> {client.Address || '—'}</p>
                    <p><strong>Documento:</strong> {client.DocNumber || '—'}</p>
                    <p><strong>Activo:</strong> {client.IsActive ? 'Sí' : 'No'}</p>
                </div>
                <div className="text-right mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Clients() {
    const [allClients, setAllClients] = useState([]); // Lista original de clientes
    const [clients, setClients] = useState([]);       // Lista filtrada a mostrar
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-clients') {
                loadClients();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    const loadClients = async () => {
        try {
            setLoading(true);
            setError(null);
            setDebugInfo("Iniciando carga de clientes...");

            console.log("Cargando clientes...");

            // Primero verificar conectividad
            setDebugInfo("Verificando conectividad con GraphQL...");
            const isConnected = await graphqlClient.checkConnection();

            if (!isConnected) {
                throw new Error("No se puede conectar al servidor GraphQL. Verifica que esté ejecutándose en http://127.0.0.1:8000");
            }

            setDebugInfo("Conectividad OK. Ejecutando consulta...");

            // Ejecutar consulta de clientes
            const data = await graphqlClient.query(QUERIES.GET_ALL_CLIENTS);

            console.log("Datos recibidos:", data);
            setDebugInfo(`Consulta exitosa. Clientes encontrados: ${data?.allClients?.length || 0}`);

            if (data && data.allClients) {
                setAllClients(data.allClients); // ← original
                setClients(data.allClients);    // ← filtro inicial = todos
            } else {
                console.warn("No se encontraron clientes en la respuesta");
                setAllClients([]);
                setClients([]);
            }

            setError(null);
            setDebugInfo(null);

        } catch (err) {
            console.error("Error cargando clientes:", err);
            setError(err.message);
            setDebugInfo(`Error: ${err.message}`);
            setAllClients([]);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    const runDiagnostic = async () => {
        setDebugInfo("Ejecutando diagnóstico completo...");
        const result = await diagnosticGraphQL();
        setDebugInfo(result ? "Diagnóstico exitoso" : "Diagnóstico falló - revisa la consola");
    };

    const handleCreateClient = () => {
        openReactWindow(
            (popup) => (
                <ClientCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-clients', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Cliente'
        );
    };

    const handleEditClient = (client) => {
        openReactWindow(
            (popup) => (
                <ClientCreate
                    client={client}
                    onSave={() => {
                        popup.opener.postMessage('reload-clients', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Cliente'
        );
    };

    const handleViewDetails = (client) => {
        setSelectedClient(client);
    };


    // El filtro ahora opera sobre allClients
    const handleFilterChange = (filteredClients) => {
        setClients(filteredClients);
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
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
                        {[1, 2, 3, 4, 5, 6].map(i => (
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
                <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={runDiagnostic}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                    >
                        Diagnóstico
                    </button>
                    <button
                        onClick={loadClients}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Recargar
                    </button>
                    <button
                        onClick={handleCreateClient}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Nuevo Cliente
                    </button>
                </div>
            </div>

            {/* Filtros */}
            {showFilters && (
                <div className="mb-6">
                    <TableFilters
                        modelName="clients"
                        data={allClients} // ← lista original sin filtrar
                        onFilterChange={handleFilterChange}
                    />
                </div>
            )}

            {/* Información de debug */}
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

            {/* Error */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h4 className="text-red-800 font-semibold mb-1">Error cargando clientes</h4>
                            <p className="text-red-700 text-sm">{error}</p>
                            <div className="mt-3 text-sm text-red-600">
                                <p className="font-medium">Posibles soluciones:</p>
                                <ul className="list-disc list-inside mt-1 space-y-1">
                                    <li>Verifica que el servidor GraphQL esté ejecutándose: <code>uvicorn app.main:app --reload</code></li>
                                    <li>Comprueba la URL del endpoint en graphqlClient.js</li>
                                    <li>Revisa la consola del navegador para más detalles</li>
                                    <li>Usa el botón "Diagnóstico" para más información</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de clientes */}
            {!error && clients.length > 0 && (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-gray-600">
                            Mostrando {clients.length} cliente{clients.length !== 1 ? 's' : ''}
                        </p>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Buscar clientes..."
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // Aquí podrías implementar búsqueda adicional por texto
                                readOnly
                            />
                            <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200" disabled>
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client) => (
                            <div key={client.ClientID} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {client.FirstName} {client.LastName}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            ID: {client.ClientID}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${client.IsActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {client.IsActive ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    {client.Email && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                            <span className="text-gray-700 truncate">{client.Email}</span>
                                        </div>
                                    )}

                                    {client.Phone && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                            <span className="text-gray-700">{client.Phone}</span>
                                        </div>
                                    )}

                                    {client.Address && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 truncate">{client.Address}</span>
                                        </div>
                                    )}

                                    {client.DocNumber && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700">Doc: {client.DocNumber}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                                    <button
                                        onClick={() => handleViewDetails(client)}
                                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Ver Detalles
                                    </button>
                                    <button
                                        onClick={() => handleEditClient(client)}
                                        className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Estado vacío */}
            {!error && !loading && clients.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay clientes</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Comienza creando tu primer cliente.
                    </p>
                    <div className="mt-6">
                        <button
                            onClick={handleCreateClient}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Crear Primer Cliente
                        </button>
                    </div>
                </div>
            )}


            {selectedClient && (
                <ClientDetails client={selectedClient} onClose={() => setSelectedClient(null)} />
            )}
        </div>
    );
}
