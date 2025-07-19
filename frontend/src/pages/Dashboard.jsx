import { useEffect, useState } from "react";
import { graphqlClient, QUERIES, dashboardHelpers } from "../utils/graphqlClient";

export default function Dashboard() {
    const [, setSelectedAccess] = useState(null);
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
                console.log("Cargando estadísticas para:", access);

                // Usar la consulta corregida que funciona con tus resolvers
                const data = await graphqlClient.query(QUERIES.GET_DASHBOARD_DATA);

                console.log("Datos recibidos del GraphQL:", data);

                // Procesar los datos usando el helper
                const companyId = access?.companyID || access?.CompanyID;
                const stats = dashboardHelpers.processDashboardData(data, companyId);

                console.log("Estadísticas procesadas:", stats);

                setDashboardStats(stats);
                setError(null);

            } catch (err) {
                console.error("Error cargando estadísticas:", err);

                // Fallback: establecer estadísticas en cero
                setDashboardStats({
                    totalClients: 0,
                    activeClients: 0,
                    totalItems: 0,
                    activeItems: 0,
                    lowStockItems: 0,
                    pendingOrders: 0,
                    totalOrders: 0,
                    completedOrders: 0,
                    monthlySales: 0,
                    monthlyOrdersCount: 0
                });

                // Mostrar error pero permitir que el dashboard se muestre
                setError(`Error cargando datos: ${err.message}`);
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

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            {error && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-yellow-800 text-sm">{error}</p>
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
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
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
                                    ${dashboardStats.monthlySales?.toLocaleString('es-AR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }) || '0,00'}
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

            {/* Resumen adicional */}
            {dashboardStats && (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Inventario</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items activos:</span>
                                <span className="font-semibold">{dashboardStats.activeItems} / {dashboardStats.totalItems}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items con stock bajo:</span>
                                <span className="font-semibold text-red-600">{dashboardStats.lowStockItems}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{
                                        width: dashboardStats.totalItems > 0
                                            ? `${(dashboardStats.activeItems / dashboardStats.totalItems) * 100}%`
                                            : '0%'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad de Órdenes</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Órdenes pendientes:</span>
                                <span className="font-semibold text-yellow-600">{dashboardStats.pendingOrders}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Órdenes completadas:</span>
                                <span className="font-semibold text-green-600">{dashboardStats.completedOrders}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Órdenes este mes:</span>
                                <span className="font-semibold">{dashboardStats.monthlyOrdersCount}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-purple-600 h-2 rounded-full"
                                    style={{
                                        width: dashboardStats.totalOrders > 0
                                            ? `${(dashboardStats.completedOrders / dashboardStats.totalOrders) * 100}%`
                                            : '0%'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Alertas y notificaciones */}
            {dashboardStats && (
                <div className="mt-8">
                    {dashboardStats.lowStockItems > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-red-800 font-semibold">Atención: Stock Bajo</h4>
                            </div>
                            <p className="text-red-700 mt-1">
                                Hay {dashboardStats.lowStockItems} item(s) con stock por debajo del mínimo requerido.
                            </p>
                            <button
                                onClick={() => window.open('/items?filter=lowstock', '_blank')}
                                className="mt-2 text-red-800 underline hover:text-red-600"
                            >
                                Ver items con stock bajo →
                            </button>
                        </div>
                    )}

                    {dashboardStats.pendingOrders > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <h4 className="text-yellow-800 font-semibold">Órdenes Pendientes</h4>
                            </div>
                            <p className="text-yellow-700 mt-1">
                                Tienes {dashboardStats.pendingOrders} orden(es) pendientes de procesar.
                            </p>
                            <button
                                onClick={() => window.open('/orders?status=pending', '_blank')}
                                className="mt-2 text-yellow-800 underline hover:text-yellow-600"
                            >
                                Ver órdenes pendientes →
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Acciones Rápidas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                        onClick={() => window.open('/clients', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Gestionar Clientes</h3>
                        </div>
                        <p className="text-sm text-gray-600">Ver, crear y editar clientes</p>
                    </button>

                    <button
                        onClick={() => window.open('/suppliers', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Gestionar Proveedores</h3>
                        </div>
                        <p className="text-sm text-gray-600">Ver, crear y editar proveedores</p>
                    </button>

                    <button
                        onClick={() => window.open('/orders', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Nueva Orden</h3>
                        </div>
                        <p className="text-sm text-gray-600">Crear una nueva orden de compra</p>
                    </button>

                    <button
                        onClick={() => window.open('/items', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Gestionar Items</h3>
                        </div>
                        <p className="text-sm text-gray-600">Ver inventario y gestionar stock</p>
                    </button>

                    <button
                        onClick={() => window.open('/reports', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Reportes</h3>
                        </div>
                        <p className="text-sm text-gray-600">Ver reportes y estadísticas</p>
                    </button>

                    <button
                        onClick={() => window.open('/settings', '_blank')}
                        className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border"
                    >
                        <div className="flex items-center mb-2">
                            <svg className="w-6 h-6 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            <h3 className="font-semibold text-gray-800">Configuración</h3>
                        </div>
                        <p className="text-sm text-gray-600">Configurar sistema y usuarios</p>
                    </button>
                </div>
            </div>

            {/* Footer del dashboard */}
            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
                    <div>
                        <p>Última actualización: {new Date().toLocaleString('es-AR')}</p>
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <button
                            onClick={() => window.location.reload()}
                            className="text-blue-600 hover:text-blue-800 underline"
                        >
                            Actualizar datos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}