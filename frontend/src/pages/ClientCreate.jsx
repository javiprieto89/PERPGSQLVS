
import { useState, useEffect, useCallback } from "react";
import { clientOperations } from "../utils/graphqlClient";

export default function ClientCreate({
    onClose,
    onSave,
    client: initialClient = null // Para edición
}) {
    const [client, setClient] = useState({
        docTypeID: "",
        docNumber: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        isActive: true,
        countryID: "",
        provinceID: "",
        priceListID: "",
        vendorID: "",
    });

    const [formData, setFormData] = useState({
        documentTypes: [],
        countries: [],
        provinces: [],
        priceLists: [],
        vendors: []
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);
    const [isEdit, setIsEdit] = useState(false);

    // Cargar datos del formulario al montar el componente
    // Función para cargar datos del formulario (usa useCallback)
    const loadFormData = useCallback(async () => {
        try {
            setLoadingForm(true);
            console.log("Cargando datos del formulario...");

            const data = await clientOperations.getClientFormData();
            console.log("Datos del formulario cargados:", data);

            setFormData(data);

        } catch (error) {
            console.error("Error cargando datos del formulario:", error);
            setError("Error cargando los datos del formulario: " + error.message);
        } finally {
            setLoadingForm(false);
        }
    }, [isEdit]);

    // Cargar datos del formulario al montar el componente
    useEffect(() => {
        loadFormData();
    }, [loadFormData]);

    // Configurar si es edición o creación
    useEffect(() => {
        if (initialClient) {
            setIsEdit(true);
            setClient({
                docTypeID: initialClient.DocTypeID ? parseInt(initialClient.DocTypeID) : "",
                docNumber: initialClient.DocNumber || "",
                firstName: initialClient.FirstName || "",
                lastName: initialClient.LastName || "",
                phone: initialClient.Phone || "",
                email: initialClient.Email || "",
                address: initialClient.Address || "",
                city: initialClient.City || "",
                postalCode: initialClient.PostalCode || "",
                isActive: initialClient.IsActive !== false,
                countryID: initialClient.CountryID ? parseInt(initialClient.CountryID) : "",
                provinceID: initialClient.ProvinceID ? parseInt(initialClient.ProvinceID) : "",
                priceListID: initialClient.PriceListID ? parseInt(initialClient.PriceListID) : "",
                vendorID: initialClient.VendorID ? parseInt(initialClient.VendorID) : "",
            });
        }
    }, [initialClient]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        let processedValue;
        if (type === "checkbox") {
            processedValue = checked;
        } else if (name.includes("ID")) {
            processedValue = value === "" ? "" : parseInt(value);
        } else {
            processedValue = value;
        }

        setClient(prev => ({
            ...prev,
            [name]: processedValue
        }));

        // Si cambia el país, actualizar la provincia
        if (name === "countryID") {
            const countryProvinces = formData.provinces.filter(p => p.CountryID === parseInt(value));
            setClient(prev => ({
                ...prev,
                countryID: value === "" ? "" : parseInt(value),
                provinceID: countryProvinces.length > 0 ? countryProvinces[0].ProvinceID : ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log("Datos del cliente a enviar:", client);

            let result;
            if (isEdit) {
                // Actualizar cliente existente
                result = await clientOperations.updateClient(initialClient.ClientID, client);
                console.log("Cliente actualizado:", result);
            } else {
                // Crear nuevo cliente
                result = await clientOperations.createClient(client);
                console.log("Cliente creado:", result);
            }

            // Llamar callback de éxito
            if (onSave) {
                onSave(result);
            }

            // Cerrar modal/formulario
            if (onClose) {
                onClose();
            }

        } catch (error) {
            console.error("Error al guardar cliente:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar provincias por país seleccionado
    const availableProvinces = formData.provinces.filter(
        p => p.CountryID === parseInt(client.countryID)
    );

    if (loadingForm) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-gray-600">Cargando formulario...</p>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">
                {isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información del documento */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Información del Documento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Tipo de Documento *</label>
                            <select
                                name="docTypeID"
                                value={client.docTypeID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione</option>
                                {formData.documentTypes.map(dt => (
                                    <option key={dt.DocTypeID} value={dt.DocTypeID}>
                                        {dt.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Número de Documento</label>
                            <input
                                type="text"
                                name="docNumber"
                                placeholder="Ingrese el número de documento"
                                value={client.docNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={50}
                            />
                        </div>
                    </div>
                </div>
                {/* Información personal */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nombre *</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Nombre del cliente"
                                value={client.firstName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                                maxLength={100}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido del cliente"
                                value={client.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={100}
                            />
                        </div>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@ejemplo.com"
                                value={client.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={100}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Teléfono</label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Número de teléfono"
                                value={client.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={20}
                            />
                        </div>
                    </div>
                </div>

                {/* Información de ubicación */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Información de Ubicación</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Dirección</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Dirección completa"
                                value={client.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                maxLength={200}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">País *</label>
                                <select
                                    name="countryID"
                                    value={client.countryID}
                                    onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione</option>
                                {formData.countries.map(country => (
                                    <option key={country.CountryID} value={country.CountryID}>
                                        {country.Name}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Provincia *</label>
                                <select
                                    name="provinceID"
                                    value={client.provinceID}
                                    onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione</option>
                                {availableProvinces.length > 0 ? (
                                    availableProvinces.map(province => (
                                        <option key={province.ProvinceID} value={province.ProvinceID}>
                                            {province.Name}
                                        </option>
                                        ))
                                    ) : (
                                        <option value="">No hay provincias disponibles</option>
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={client.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    maxLength={100}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Código Postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Código postal"
                                    value={client.postalCode}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    maxLength={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Configuración comercial */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Configuración Comercial</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Lista de Precios *</label>
                            <select
                                name="priceListID"
                                value={client.priceListID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione</option>
                                {formData.priceLists.map(priceList => (
                                    <option key={priceList.PriceListID} value={priceList.PriceListID}>
                                        {priceList.Name} {priceList.Description && `- ${priceList.Description}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Vendedor *</label>
                            <select
                                name="vendorID"
                                value={client.vendorID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Seleccione</option>
                                {formData.vendors.map(vendor => (
                                    <option key={vendor.VendorID} value={vendor.VendorID}>
                                        {vendor.VendorName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={client.isActive}
                                onChange={handleChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium">Cliente activo</span>
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Los clientes inactivos no aparecerán en las búsquedas por defecto
                        </p>
                    </div>
                </div>

                {/* Resumen de datos (solo en edición) */}
                {isEdit && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Información del Cliente</h3>
                        <div className="text-sm text-gray-600">
                            <p><strong>ID:</strong> {initialClient?.ClientID}</p>
                            <p><strong>Creado:</strong> {new Date().toLocaleDateString()}</p>
                            <p><strong>Estado:</strong> {client.isActive ? 'Activo' : 'Inactivo'}</p>
                        </div>
                    </div>
                )}

                {/* Botones de acción */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !client.firstName.trim()}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {isEdit ? 'Actualizando...' : 'Guardando...'}
                            </>
                        ) : (
                            isEdit ? 'Actualizar Cliente' : 'Guardar Cliente'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}