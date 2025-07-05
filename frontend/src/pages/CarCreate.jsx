// frontend/src/pages/CarCreate.jsx
import React, { useState, useEffect } from 'react';
import { graphqlClient, QUERIES, MUTATIONS } from '../utils/graphqlClient';
import { carBrandOperations, carModelOperations, clientOperations } from '../utils/graphqlClient';
import CarBrandSearchModal from '../components/CarBrandSearchModal';
import CarModelSearchModal from '../components/CarModelSearchModal';
import ClientSearchModal from '../components/ClientSearchModal';

export default function CarCreate({ initialData = null, onClose, onSave }) {
    const [form, setForm] = useState({
        carBrandID: '',
        carModelID: '',
        clientID: '',
        licensePlate: '',
        year: '',
        lastServiceMileage: '',
        isDebtor: false,
        discountID: ''
    });

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [clients, setClients] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Estados para los modales
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showModelModal, setShowModelModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    useEffect(() => {
        loadInitialData();
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [brandsData, clientsData, discountsData] = await Promise.all([
                carBrandOperations.getAllCarBrands(),
                clientOperations.getAllClients(),
                graphqlClient.query(QUERIES.GET_ALL_DISCOUNTS)
            ]);
            setBrands(brandsData || []);
            setClients(clientsData || []);
            setDiscounts(discountsData?.allDiscounts || []);
        } catch (error) {
            console.error('Error loading initial data:', error);
            setError('Error cargando datos iniciales: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    // Cargar modelos cuando cambia la marca
    useEffect(() => {
        if (form.carBrandID) {
            carModelOperations.getCarModelsByBrand(parseInt(form.carBrandID))
                .then(setModels)
                .catch(console.error);
        } else {
            setModels([]);
        }
    }, [form.carBrandID]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const carData = {
                carBrandID: parseInt(form.carBrandID),
                carModelID: parseInt(form.carModelID),
                clientID: parseInt(form.clientID),
                licensePlate: form.licensePlate,
                year: form.year ? parseInt(form.year) : null,
                lastServiceMileage: form.lastServiceMileage ? parseInt(form.lastServiceMileage) : null,
                isDebtor: form.isDebtor,
                discountID: parseInt(form.discountID)
            };

            let result;
            if (initialData) {
                result = await graphqlClient.mutation(MUTATIONS.UPDATE_CAR, {
                    carID: initialData.carID,
                    input: carData
                });
            } else {
                result = await graphqlClient.mutation(MUTATIONS.CREATE_CAR, {
                    input: carData
                });
            }

            if (onSave) onSave(result);
            if (onClose) onClose();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar la selección de cliente desde el modal
    const handleClientSelect = (client) => {
        setForm(prev => ({
            ...prev,
            clientID: client.ClientID || client.clientID
        }));
        setShowClientModal(false);
    };

    // Función para manejar la selección de marca desde el modal
    const handleBrandSelect = (brand) => {
        setForm(prev => ({
            ...prev,
            carBrandID: brand.CarBrandID,
            carModelID: '' // Reset model when brand changes
        }));
        setShowBrandModal(false);
    };

    // Función para manejar la selección de modelo desde el modal
    const handleModelSelect = (model) => {
        setForm(prev => ({
            ...prev,
            carModelID: model.CarModelID,
            carBrandID: model.CarBrandID
        }));
        setShowModelModal(false);
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {initialData ? 'Editar Auto' : 'Nuevo Auto'}
                </h2>

                {error && <div className="text-red-600 mb-2">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Marca */}
                    <div>
                        <label htmlFor="carBrandID" className="block text-sm font-medium mb-1">
                            Marca
                        </label>
                        <div className="flex items-center space-x-2">
                            <select
                                id="carBrandID"
                                name="carBrandID"
                                value={form.carBrandID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                            >
                                <option value="">Seleccione</option>
                                {brands.map(b => (
                                    <option key={b.CarBrandID} value={b.CarBrandID}>
                                        {b.Name}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowBrandModal(true)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Modelo */}
                    <div>
                        <label htmlFor="carModelID" className="block text-sm font-medium mb-1">
                            Modelo
                        </label>
                        <div className="flex items-center space-x-2">
                            <select
                                id="carModelID"
                                name="carModelID"
                                value={form.carModelID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                                disabled={!form.carBrandID}
                            >
                                <option value="">Seleccione</option>
                                {models.map(m => (
                                    <option key={m.CarModelID} value={m.CarModelID}>
                                        {m.Model}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowModelModal(true)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Cliente - MEJORADO */}
                    <div>
                        <label htmlFor="clientID" className="block text-sm font-medium mb-1">
                            Cliente
                        </label>
                        <div className="flex items-center space-x-2">
                            <select
                                id="clientID"
                                name="clientID"
                                value={form.clientID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                            >
                                <option value="">Seleccione</option>
                                {clients.map(c => (
                                    <option key={c.ClientID} value={c.ClientID}>
                                        {c.FirstName} {c.LastName}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="button"
                                onClick={() => setShowClientModal(true)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Patente */}
                    <div>
                        <label htmlFor="licensePlate" className="block text-sm font-medium mb-1">
                            Patente
                        </label>
                        <input
                            id="licensePlate"
                            type="text"
                            name="licensePlate"
                            value={form.licensePlate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>

                    {/* Año */}
                    <div>
                        <label htmlFor="year" className="block text-sm font-medium mb-1">
                            Año
                        </label>
                        <input
                            id="year"
                            type="number"
                            name="year"
                            value={form.year}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Kilometraje último servicio */}
                    <div>
                        <label htmlFor="lastServiceMileage" className="block text-sm font-medium mb-1">
                            Kilometraje último servicio
                        </label>
                        <input
                            id="lastServiceMileage"
                            type="number"
                            name="lastServiceMileage"
                            value={form.lastServiceMileage}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Deudor */}
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                name="isDebtor"
                                checked={form.isDebtor}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span>Deudor</span>
                        </label>
                    </div>

                    {/* Descuento */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Descuento
                        </label>
                        <select
                            name="discountID"
                            value={form.discountID}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Seleccione</option>
                            {discounts.map(d => (
                                <option key={d.DiscountID} value={d.DiscountID}>
                                    {d.DiscountName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !form.licensePlate || !form.carBrandID || !form.carModelID || !form.clientID || !form.discountID}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modales */}
            {showBrandModal && (
                <CarBrandSearchModal
                    isOpen={true}
                    onClose={() => setShowBrandModal(false)}
                    onBrandSelect={handleBrandSelect}
                />
            )}

            {showModelModal && (
                <CarModelSearchModal
                    isOpen={true}
                    onClose={() => setShowModelModal(false)}
                    onModelSelect={handleModelSelect}
                />
            )}

            {showClientModal && (
                <ClientSearchModal
                    isOpen={true}
                    onClose={() => setShowClientModal(false)}
                    onClientSelect={handleClientSelect}
                />
            )}
        </>
    );
}