import { useEffect, useState } from "react";
import { graphqlClient, QUERIES } from "../utils/graphqlClient";

export default function Dashboard() {
    const [selectedAccess, setSelectedAccess] = useState(null);
    const [dashboardStats, setDashboardStats] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initializeDashboard() {
            try {
                setLoading(true);

                // Cargar acceso seleccionado del sessionStorage
                const storedSelected = sessionStorage.getItem("selected_access");

                if (storedSelected) {
                    const selected = JSON.parse(storedSelected);
                    setSelectedAccess(selected);
                    await loadStats(selected);
                } else {
                    // Si no hay acceso seleccionado, verificar si hay datos de acceso
                    const storedAccess = sessionStorage.getItem("access_data");
                    if (storedAccess) {
                        const parsedAccess = JSON.parse(storedAccess);
                        if (parsedAccess.length > 0) {
                            const firstAccess = parsedAccess[0];
                            setSelectedAccess(firstAccess);
                            sessionStorage.setItem("selected_access", JSON.stringify(firstAccess));
                            await loadStats(firstAccess);
                        } else {
                            setError("No hay accesos configurados para este usuario.");
                        }
                    } else {
                        setError("No se pudieron cargar los datos de acceso del usuario.");
                    }
                }
            } catch (err) {
                console.error("Error inicializando dashboard:", err);
                setError("Error al cargar el dashboard");
            } finally {
                setLoading(false);
            }
        }

        async function loadStats(access) {
            try {
                // Intentar cargar estadísticas completas
                const data = await graphqlClient.query(QUERIES.GET_DASHBOARD_STATS, {
                    filters: {
                        company_id: access.companyID,
                        branch_id: access.branchID
                    }
                });

                setDashboardStats(data.dashboardStats);
                setError(null);
            } catch (err) {
                console.warn("Dashboard stats no disponible, cargando datos básicos:", err);

                // Fallback: cargar datos básicos
                try {
                    const clientsData = await graphqlClient.query(QUERIES.GET_CLIENTS_COUNT, {
                        companyID: access.companyID
                    });

                    setDashboardStats({
                        totalClients: clientsData.clientsCount || 0,
                        activeClients: clientsData.clientsCount || 0,
                        totalItems: 0,
                        activeItems: 0,
                        lowStockItems: 0,
                        pendingOrders: 0,
                        totalOrders: 0,
                        completedOrders: 0,
                        monthlySales: 0
                    });
                    setError(null);
                } catch (basicErr) {
                    console.error("Error cargando datos básicos:", basicErr);
                    setDashboardStats({
                        totalClients: 0,
                        activeClients: 0,
                        totalItems: 0,
                        activeItems: 0,
                        lowStockItems: 0,
                        pendingOrders: 0,
                        totalOrders: 0,
                        completedOrders: 0,
                        monthlySales: 0
                    });
                }
            }
        }

        initializeDashboard();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-gray-200 h-32 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="text-red-800 font-semibold">Error</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {selectedAccess && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h2 className="font-semibold text-blue-800 mb-2">Contexto Actual:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Empresa:</span> {selectedAccess.companyName || 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Sucursal:</span> {selectedAccess.branchName || 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Rol:</span> {selectedAccess.roleName || 'N/A'}
                        </div>
                    </div>
                </div>
            )}

            {dashboardStats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Clientes</h3>
                                <p className="text-3xl font-bold text-blue-600">
                                    {dashboardStats.totalClients}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {dashboardStats.activeClients} activos
                                </p>
                            </div>
                            <div className="text-blue-500">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
                                <p className="text-3xl font-bold text-green-600">
                                    {dashboardStats.totalItems}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {dashboardStats.lowStockItems} con stock bajo
                                </p>
                            </div>
                            <div className="text-green-500">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Órdenes</h3>
                                <p className="text-3xl font-bold text-purple-600">
                                    {dashboardStats.totalOrders}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {dashboardStats.pendingOrders} pendientes
                                </p>
                            </div>
                            <div className="text-purple-500">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 mb-2">Ventas del Mes</h3>
                                <p className="text-3xl font-bold text-orange-600">
                                    ${dashboardStats.monthlySales?.toLocaleString() || '0'}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    {dashboardStats.completedOrders} completadas
                                </p>
                            </div>
                            <div className="text-orange-500">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => window.open('/clients', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <h3 className="font-semibold text-gray-800">Gestionar Clientes</h3>
                        <p className="text-sm text-gray-600 mt-1">Ver, crear y editar clientes</p>
                    </button>

                    <button
                        onClick={() => window.open('/suppliers', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <h3 className="font-semibold text-gray-800">Gestionar Proveedores</h3>
                        <p className="text-sm text-gray-600 mt-1">Ver, crear y editar proveedores</p>
                    </button>

                    <button
                        onClick={() => window.open('/orders', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <h3 className="font-semibold text-gray-800">Nueva Orden</h3>
                        <p className="text-sm text-gray-600 mt-1">Crear una nueva orden de compra</p>
                    </button>
                </div>
            </div>
        </div>
    );
}