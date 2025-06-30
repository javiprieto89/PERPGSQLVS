import { useState, useEffect } from "react";
import { graphqlClient, MUTATIONS } from "../utils/graphqlClient";

export default function ClientCreate({
    countries = [],
    provinces = [],
    priceLists = [],
    documentTypes = [],
    onClose
}) {
    const [client, setClient] = useState({
        documentTypeID: 1,
        documentNumber: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        isActive: true,
        countryID: 1,
        provinceID: 1,
        priceListID: 1,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Actualizar valores por defecto cuando se cargan los datos
    useEffect(() => {
        setClient(prev => ({
            ...prev,
            documentTypeID: documentTypes[0]?.documentTypeID || 1,
            countryID: countries[0]?.countryID || 1,
            provinceID: provinces[0]?.provinceID || 1,
            priceListID: priceLists[0]?.priceListID || 1,
        }));
    }, [documentTypes, countries, provinces, priceLists]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setClient(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked :
                (name.includes("ID") ? parseInt(value) : value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validaciones básicas
            if (!client.firstName.trim()) {
                throw new Error("El nombre es obligatorio");
            }
            if (!client.lastName.trim()) {
                throw new Error("El apellido es obligatorio");
            }
            if (!client.documentNumber.trim()) {
                throw new Error("El número de documento es obligatorio");
            }

            await graphqlClient.mutation(MUTATIONS.CREATE_CLIENT, {
                input: {
                    documentTypeID: client.documentTypeID,
                    documentNumber: client.documentNumber,
                    firstName: client.firstName,
                    lastName: client.lastName,
                    phone: client.phone,
                    email: client.email,
                    address: client.address,
                    city: client.city,
                    postalCode: client.postalCode,
                    isActive: client.isActive,
                    countryID: client.countryID,
                    provinceID: client.provinceID,
                    priceListID: client.priceListID,
                }
            });

            if (onClose) onClose();
        } catch (e) {
            console.error(e);
            setError("Error al guardar el cliente: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Nuevo Cliente</h2>

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
                                name="documentTypeID"
                                value={client.documentTypeID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                {documentTypes.map(dt => (
                                    <option key={dt.documentTypeID} value={dt.documentTypeID}>
                                        {dt.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Número de Documento *</label>
                            <input
                                type="text"
                                name="documentNumber"
                                placeholder="Ingrese el número de documento"
                                value={client.documentNumber}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
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
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Apellido *</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Apellido del cliente"
                                value={client.lastName}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
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
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    value={client.city}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Código Postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Código postal"
                                    value={client.postalCode}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">País</label>
                                <select
                                    name="countryID"
                                    value={client.countryID}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {countries.map(country => (
                                        <option key={country.countryID} value={country.countryID}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Provincia</label>
                            <select
                                name="provinceID"
                                value={client.provinceID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {provinces.map(province => (
                                    <option key={province.provinceID} value={province.provinceID}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Configuración comercial */}
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Configuración Comercial</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Lista de Precios</label>
                            <select
                                name="priceListID"
                                value={client.priceListID}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {priceLists.map(priceList => (
                                    <option key={priceList.priceListID} value={priceList.priceListID}>
                                        {priceList.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
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
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Guardando...
                            </>
                        ) : (
                            'Guardar Cliente'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}