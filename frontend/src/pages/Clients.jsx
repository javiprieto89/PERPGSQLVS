import { useEffect, useState } from "react";
import TableFilters from "../components/TableFilters";
import {
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { graphqlClient, QUERIES, MUTATIONS } from "../utils/graphqlClient";
import MyWindowPortal from "../components/MyWindowPortal";
import ClientCreate from "./ClientCreate";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingClient, setEditingClient] = useState(null);
    const [deletingClient, setDeletingClient] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [popup, setPopup] = useState(null);

    // Datos de catálogo
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [priceLists, setPriceLists] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);

    // Estado para filtros
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActive, setFilterActive] = useState("all");

    const loadData = async () => {
        try {
            setLoading(true);

            // Obtener contexto actual
            const storedSelected = sessionStorage.getItem("selected_access");
            if (!storedSelected) {
                throw new Error("No hay acceso seleccionado");
            }

            const access = JSON.parse(storedSelected);

            // Cargar datos en paralelo
            const [
                clientsData,
                countriesData,
                provincesData,
                priceListsData,
                documentTypesData
            ] = await Promise.all([
                graphqlClient.query(QUERIES.GET_CLIENTS, {
                    companyID: access.companyID
                }),
                graphqlClient.query(QUERIES.GET_COUNTRIES),
                graphqlClient.query(QUERIES.GET_PROVINCES),
                graphqlClient.query(QUERIES.GET_PRICE_LISTS, {
                    companyID: access.companyID
                }),
                graphqlClient.query(QUERIES.GET_DOCUMENT_TYPES)
            ]);

            setClients(clientsData.clients || []);
            setCountries(countriesData.countries || []);
            setProvinces(provincesData.provinces || []);
            setPriceLists(priceListsData.pricelists || []);
            setDocumentTypes(documentTypesData.documenttypes || []);

        } catch (e) {
            console.error("Error cargando datos:", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const openClientCreatePopup = () => {
        setPopup(
            <MyWindowPortal
                title="Nuevo Cliente"
                width={800}
                height={600}
                onClose={() => {
                    setPopup(null);
                    loadData();
                }}
            >
                <ClientCreate
                    countries={countries}
                    provinces={provinces}
                    priceLists={priceLists}
                    documentTypes={documentTypes}
                    onClose={() => {
                        setPopup(null);
                        loadData();
                    }}
                />
            </MyWindowPortal>
        );
    };

    const handleEditClick = (client) => {
        setEditingClient({ ...client });
    };

    const handleDeleteClick = (client) => {
        setDeletingClient(client);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingClient(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked :
                (name.includes("ID") ? parseInt(value) : value),
        }));
    };

    const handleUpdate = async () => {
        try {
            await graphqlClient.mutation(MUTATIONS.UPDATE_CLIENT, {
                clientID: editingClient.clientID,
                input: {
                    documentTypeID: editingClient.documentTypeID,
                    documentNumber: editingClient.documentNumber,
                    firstName: editingClient.firstName,
                    lastName: editingClient.lastName,
                    phone: editingClient.phone,
                    email: editingClient.email,
                    address: editingClient.address,
                    city: editingClient.city,
                    postalCode: editingClient.postalCode,
                    isActive: editingClient.isActive,
                    countryID: editingClient.countryID,
                    provinceID: editingClient.provinceID,
                    priceListID: editingClient.priceListID,
                }
            });

            await loadData();
            setEditingClient(null);
        } catch (err) {
            console.error("Error al actualizar:", err);
            setError("Error al actualizar cliente: " + err.message);
        }
    };

    const confirmDelete = async () => {
        try {
            await graphqlClient.mutation(MUTATIONS.DELETE_CLIENT, {
                clientID: deletingClient.clientID
            });

            setClients(prev =>
                prev.filter(x => x.clientID !== deletingClient.clientID)
            );
            setDeletingClient(null);
        } catch (e) {
            console.error("Error al eliminar:", e);
            setError("Error al eliminar cliente: " + e.message);
        }
    };

    // Filtrar clientes
    const filteredClients = clients.filter(client => {
        const matchesSearch = !searchTerm ||
            client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.documentNumber?.toString().includes(searchTerm);

        const matchesActive = filterActive === "all" ||
            (filterActive === "active" && client.isActive) ||
            (filterActive === "inactive" && !client.isActive);

        return matchesSearch && matchesActive;
    });

    const getCountryName = (countryID) =>
        countries.find(c => c.countryID === countryID)?.name || 'N/A';

    const getProvinceName = (provinceID) =>
        provinces.find(p => p.provinceID === provinceID)?.name || 'N/A';

    const getPriceListName = (priceListID) =>
        priceLists.find(pl => pl.priceListID === priceListID)?.name || 'N/A';

    const getDocumentTypeName = (documentTypeID) =>
        documentTypes.find(dt => dt.documentTypeID === documentTypeID)?.name || 'N/A';

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Clientes</h1>
                <button
                    onClick={openClientCreatePopup}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nuevo Cliente
                </button>
            </div>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-800 underline text-sm"
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Filtros */}
            <div className="mb-4 space-y-4">
                <div className="flex gap-4 items-center">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o documento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                        value={filterActive}
                        onChange={(e) => setFilterActive(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </select>
                </div>
                <div className="text-sm text-gray-600">
                    Mostrando {filteredClients.length} de {clients.length} clientes
                </div>
            </div>

            {/* Tabla de clientes */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ubicación
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredClients.map((client) => (
                                <tr key={client.clientID} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {client.firstName} {client.lastName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {client.clientID}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {getDocumentTypeName(client.documentTypeID)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {client.documentNumber}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {client.email || 'Sin email'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {client.phone || 'Sin teléfono'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {client.city || 'Sin ciudad'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {getProvinceName(client.provinceID)}, {getCountryName(client.countryID)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${client.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {client.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(client)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(client)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredClients.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {clients.length === 0 ? 'No hay clientes registrados' : 'No se encontraron clientes con los filtros aplicados'}
                </div>
            )}

            {/* Modal de edición */}
            {editingClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo de Documento</label>
                                <select
                                    name="documentTypeID"
                                    value={editingClient.documentTypeID}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                >
                                    {documentTypes.map(dt => (
                                        <option key={dt.documentTypeID} value={dt.documentTypeID}>
                                            {dt.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Número de Documento</label>
                                <input
                                    type="text"
                                    name="documentNumber"
                                    value={editingClient.documentNumber || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={editingClient.firstName || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Apellido</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={editingClient.lastName || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editingClient.email || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={editingClient.phone || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editingClient.address || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={editingClient.city || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Código Postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={editingClient.postalCode || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">País</label>
                                <select
                                    name="countryID"
                                    value={editingClient.countryID}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                >
                                    {countries.map(country => (
                                        <option key={country.countryID} value={country.countryID}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Provincia</label>
                                <select
                                    name="provinceID"
                                    value={editingClient.provinceID}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                >
                                    {provinces.map(province => (
                                        <option key={province.provinceID} value={province.provinceID}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Lista de Precios</label>
                                <select
                                    name="priceListID"
                                    value={editingClient.priceListID}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                >
                                    {priceLists.map(priceList => (
                                        <option key={priceList.priceListID} value={priceList.priceListID}>
                                            {priceList.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={editingClient.isActive}
                                        onChange={handleEditChange}
                                    />
                                    <span>Cliente activo</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setEditingClient(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {deletingClient && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                        <p className="mb-4">
                            ¿Estás seguro de que deseas eliminar al cliente{" "}
                            <strong>{deletingClient.firstName} {deletingClient.lastName}</strong>?
                        </p>
                        <p className="text-sm text-gray-600 mb-6">
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setDeletingClient(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {popup}
        </div>
    );
}