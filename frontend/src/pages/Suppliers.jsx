import { useEffect, useState } from "react";
import {
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";
import { supplierOperations } from "../utils/graphqlClient";
import SupplierCreate from "./SupplierCreate";

export default function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [deletingSupplier, setDeletingSupplier] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Estado para filtros
    const [searchTerm, setSearchTerm] = useState("");
    const [filterActive, setFilterActive] = useState("all");

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await supplierOperations.getAllSuppliers();
            setSuppliers(data);

        } catch (e) {
            console.error("Error cargando proveedores:", e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleEditClick = (supplier) => {
        setEditingSupplier({ ...supplier });
    };

    const handleDeleteClick = (supplier) => {
        setDeletingSupplier(supplier);
    };

    const handleEditChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEditingSupplier(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const updated = await supplierOperations.updateSupplier(editingSupplier.SupplierID, editingSupplier);
            setSuppliers(prev => prev.map(s =>
                s.SupplierID === updated.SupplierID ? updated : s
            ));
            setEditingSupplier(null);
        } catch (err) {
            console.error("Error al actualizar:", err);
            setError("Error al actualizar proveedor: " + err.message);
        }
    };

    const confirmDelete = async () => {
        try {
            await supplierOperations.deleteSupplier(deletingSupplier.SupplierID);
            setSuppliers(prev => prev.filter(s => s.SupplierID !== deletingSupplier.SupplierID));
            setDeletingSupplier(null);
        } catch (e) {
            console.error("Error al eliminar:", e);
            setError("Error al eliminar proveedor: " + e.message);
        }
    };

    // Filtrar proveedores
    const filteredSuppliers = suppliers.filter(supplier => {
        const fullName = `${supplier.FirstName || ''} ${supplier.LastName || ''}`.toLowerCase();
        const matchesSearch = !searchTerm ||
            fullName.includes(searchTerm.toLowerCase()) ||
            supplier.Email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            supplier.Phone?.includes(searchTerm);

        const matchesActive = filterActive === "all" ||
            (filterActive === "active" && supplier.IsActive) ||
            (filterActive === "inactive" && !supplier.IsActive);

        return matchesSearch && matchesActive;
    });

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
                <h1 className="text-2xl font-bold">Proveedores</h1>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nuevo Proveedor
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
                        placeholder="Buscar por nombre, email o teléfono..."
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
                    Mostrando {filteredSuppliers.length} de {suppliers.length} proveedores
                </div>
            </div>

            {/* Tabla de proveedores */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Proveedor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contacto
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Dirección
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
                            {filteredSuppliers.map((supplier) => (
                                <tr key={supplier.SupplierID} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {supplier.FirstName} {supplier.LastName}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                ID: {supplier.SupplierID}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {supplier.Email || 'Sin email'}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {supplier.Phone || 'Sin teléfono'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {supplier.Address || 'Sin dirección'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${supplier.IsActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {supplier.IsActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(supplier)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(supplier)}
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

            {filteredSuppliers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {suppliers.length === 0 ? 'No hay proveedores registrados' : 'No se encontraron proveedores con los filtros aplicados'}
                </div>
            )}

            {/* Modal de edición */}
            {editingSupplier && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">Editar Proveedor</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={editingSupplier.FirstName || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={editingSupplier.Email || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Teléfono</label>
                                <input
                                    type="tel"
                                    name="Phone"
                                    value={editingSupplier.Phone || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-1">Dirección</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={editingSupplier.Address || ''}
                                    onChange={handleEditChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="IsActive"
                                        checked={editingSupplier.IsActive}
                                        onChange={handleEditChange}
                                    />
                                    <span>Proveedor activo</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setEditingSupplier(null)}
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
            {deletingSupplier && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                        <p className="mb-4">
                            ¿Estás seguro de que deseas eliminar al proveedor{" "}
                            <strong>{deletingSupplier.FirstName}</strong>?
                        </p>
                        <p className="text-sm text-gray-600 mb-6">
                            Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setDeletingSupplier(null)}
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

            {showCreateForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <SupplierCreate
                            onClose={() => setShowCreateForm(false)}
                            onSave={(newSup) => setSuppliers(prev => [...prev, newSup])}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}