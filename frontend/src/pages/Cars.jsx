import { useEffect, useState, useCallback } from "react";
import { carOperations } from "../utils/graphqlClient";
import CarCreate from "./CarCreate";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";

export default function Cars() {
    const [allCars, setAllCars] = useState([]);
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [isComponentMounted, setIsComponentMounted] = useState(true);

    // Marcar cuando el componente está montado
    useEffect(() => {
        setIsComponentMounted(true);
        return () => setIsComponentMounted(false);
    }, []);

    const loadCars = useCallback(async () => {
        if (!isComponentMounted) return;

        try {
            setLoading(true);
            const data = await carOperations.getAllCars();

            if (isComponentMounted) {
                setAllCars(data);
                setCars(data);
                setError(null);
            }
        } catch (err) {
            console.error("Error cargando autos:", err);
            if (isComponentMounted) {
                setError(err.message);
                setCars([]);
            }
        } finally {
            if (isComponentMounted) {
                setLoading(false);
            }
        }
    }, [isComponentMounted]);

    // Cargar autos al montar el componente
    useEffect(() => {
        loadCars();
    }, [loadCars]);

    // Escuchar mensajes para recargar
    useEffect(() => {
        const handler = (e) => {
            if (e.data === 'reload-cars' && isComponentMounted) {
                loadCars();
            }
        };

        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [loadCars, isComponentMounted]);

    const handleCreate = () => {
        openReactWindow(
            (popup) => (
                <CarCreate
                    onSave={() => {
                        popup.opener.postMessage('reload-cars', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Nuevo Auto'
        );
    };

    // Manejar cambio de filtros - CORREGIDO para evitar bucles
    const handleFilterChange = useCallback((filtered) => {
        if (isComponentMounted) {
            setCars(filtered);
        }
    }, [isComponentMounted]);

    // Manejar toggle de filtros - CORREGIDO
    const handleToggleFilters = useCallback(() => {
        setShowFilters(prev => {
            const newValue = !prev;
            console.log('Toggling filters:', newValue);

            // Forzar re-render del componente padre para asegurar navegación correcta
            setTimeout(() => {
                if (isComponentMounted) {
                    // Trigger re-render para limpiar cualquier estado residual
                    setAllCars(current => [...current]);
                }
            }, 100);

            return newValue;
        });
    }, [isComponentMounted]);

    const handleEdit = (c) => {
        openReactWindow(
            (popup) => (
                <CarCreate
                    car={c}
                    onSave={() => {
                        popup.opener.postMessage('reload-cars', '*');
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            'Editar Auto'
        );
    };

    // Cleanup de filtros al desmontar
    useEffect(() => {
        return () => {
            if (!isComponentMounted) {
                console.log('Cars component unmounted, cleaning up filters');
            }
        };
    }, [isComponentMounted]);

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Autos</h1>
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-600">Cargando...</span>
                    </div>
                </div>
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
                <h1 className="text-3xl font-bold text-gray-800">Autos</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={handleToggleFilters}
                        className={`px-4 py-2 text-white rounded transition-colors duration-200 ${showFilters
                            ? 'bg-purple-700 hover:bg-purple-800'
                            : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                    </button>
                    <button
                        onClick={loadCars}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Recargar
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Nuevo Auto
                    </button>
                </div>
            </div>

            {/* Filtros - Solo renderizar cuando está visible y hay datos */}
            {showFilters && allCars.length > 0 && (
                <div className="mb-6">
                    <TableFilters
                        key={`cars-filters-${showFilters}-${allCars.length}`}
                        modelName="cars"
                        data={allCars}
                        onFilterChange={handleFilterChange}
                    />
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
                            <h4 className="text-red-800 font-semibold mb-1">Error cargando autos</h4>
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Lista de autos */}
            {!error && cars.length > 0 && (
                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-gray-600">
                            Mostrando {cars.length} auto{cars.length !== 1 ? 's' : ''} de {allCars.length} total{allCars.length !== 1 ? 'es' : ''}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map(c => (
                            <div key={c.CarID} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{c.LicensePlate}</h3>
                                        <p className="text-sm text-gray-600">ID: {c.CarID}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${c.IsDebtor
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                        }`}>
                                        {c.IsDebtor ? 'Deudor' : 'Al día'}
                                    </span>
                                </div>

                                <div className="space-y-2 text-sm">
                                    {/* AGREGADO: Información del cliente */}
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 font-medium">Cliente: {c.ClientName || '—'}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">Año: {c.Year || '—'}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">Marca: {c.CarBrandName || '—'}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">Modelo: {c.CarModelName || '—'}</span>
                                    </div>

                                    {c.LastServiceMileage && (
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-700">Último servicio: {c.LastServiceMileage} km</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleEdit(c)}
                                        className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                                    >
                                        Editar Auto
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Estado vacío */}
            {!error && !loading && cars.length === 0 && (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hay autos</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {showFilters ? 'No se encontraron autos con los filtros aplicados.' : 'Comienza creando tu primer auto.'}
                    </p>
                    <div className="mt-6">
                        {showFilters ? (
                            <button
                                onClick={handleToggleFilters}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
                            >
                                Limpiar Filtros
                            </button>
                        ) : (
                            <button
                                onClick={handleCreate}
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                Crear Primer Auto
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}