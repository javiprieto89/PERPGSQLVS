// frontend/src/pages/CarCreate.jsx
import { useState, useEffect, useCallback } from 'react';
import { carOperations } from '../utils/graphqlClient';
import CarBrandSearchModal from '../components/CarBrandSearchModal';
import CarModelSearchModal from '../components/CarModelSearchModal';
import ClientSearchModal from '../components/ClientSearchModal';

export default function CarCreate({ initialData = null, onClose, onSave }) {
    const [car, setCar] = useState({
        companyID: '',
        carBrandID: '',
        carModelID: '',
        clientID: '',
        licensePlate: '',
        year: '',
        lastServiceMileage: '',
        isDebtor: false,
        discountID: ''
    });

    const [formData, setFormData] = useState({
        companies: [],
        carBrands: [],
        carModels: [],
        clients: [],
        discounts: []
    });

    const [loading, setLoading] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);
    const [error, setError] = useState('');
    const [isEdit, setIsEdit] = useState(false);

    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showModelModal, setShowModelModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    const loadFormData = useCallback(async () => {
        try {
            setLoadingForm(true);
            const data = await carOperations.getCarFormData();
            setFormData(data);
        } catch (err) {
            console.error('Error cargando datos del formulario:', err);
            setError('Error cargando los datos del formulario: ' + err.message);
        } finally {
            setLoadingForm(false);
        }
    }, []);

    useEffect(() => {
        loadFormData();
    }, [loadFormData]);

    useEffect(() => {
        if (initialData) {
            setIsEdit(true);
            setCar({
                companyID: initialData.CompanyID || '',
                carBrandID: initialData.CarBrandID || '',
                carModelID: initialData.CarModelID || '',
                clientID: initialData.ClientID || '',
                licensePlate: initialData.LicensePlate || '',
                year: initialData.Year || '',
                lastServiceMileage: initialData.LastServiceMileage || '',
                isDebtor: initialData.IsDebtor || false,
                discountID: initialData.DiscountID || ''
            });
        }
    }, [initialData]);

    // Filtrar marcas por compañía seleccionada
    const availableBrands = formData.carBrands.filter(b =>
        !car.companyID || b.CompanyID === parseInt(car.companyID)
    );
    // Actualizar modelos disponibles cuando cambia la marca
    const availableModels = formData.carModels.filter(
        m => m.CarBrandID === parseInt(car.carBrandID)
    );

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processed = type === 'checkbox' ? checked : value;
        if (name.includes('ID') || name === 'year' || name === 'lastServiceMileage') {
            processed = value === '' ? '' : parseInt(value);
        }
        setCar(prev => {
            const updated = { ...prev, [name]: processed };
            if (name === 'companyID') {
                updated.carBrandID = '';
                updated.carModelID = '';
            } else if (name === 'carBrandID') {
                updated.carModelID = '';
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const carData = {
                CompanyID: car.companyID ? parseInt(car.companyID) : null,
                CarModelID: parseInt(car.carModelID),
                ClientID: parseInt(car.clientID),
                LicensePlate: car.licensePlate,
                Year: car.year ? parseInt(car.year) : null,
                LastServiceMileage: car.lastServiceMileage ? parseInt(car.lastServiceMileage) : null,
                IsDebtor: car.isDebtor,
                DiscountID: parseInt(car.discountID)
            };

            let result;
            if (isEdit) {
                result = await carOperations.updateCar(initialData.CarID, carData);
            } else {
                result = await carOperations.createCar(carData);
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
        setCar(prev => ({
            ...prev,
            clientID: client.ClientID || client.clientID
        }));
        setShowClientModal(false);
    };

    // Función para manejar la selección de marca desde el modal
    const handleBrandSelect = (brand) => {
        setCar(prev => ({
            ...prev,
            carBrandID: brand.CarBrandID,
            carModelID: '' // Reset model when brand changes
        }));
        setShowBrandModal(false);
    };

    // Función para manejar la selección de modelo desde el modal
    const handleModelSelect = (model) => {
        setCar(prev => ({
            ...prev,
            carModelID: model.CarModelID,
            carBrandID: model.CarBrandID
        }));
        setShowModelModal(false);
    };

    if (loadingForm) {
        return (
            <div className="p-6 max-w-2xl mx-auto">
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
        <>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                    {initialData ? 'Editar Auto' : 'Nuevo Auto'}
                </h2>

                {error && <div className="text-red-600 mb-2">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Compañía */}
                    <div>
                        <label htmlFor="companyID" className="block text-sm font-medium mb-1">
                            Compañía
                        </label>
                        <select
                            id="companyID"
                            name="companyID"
                            value={car.companyID}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Seleccione</option>
                            {formData.companies.map(c => (
                                <option key={c.CompanyID} value={c.CompanyID}>
                                    {c.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Marca */}
                    <div>
                        <label htmlFor="carBrandID" className="block text-sm font-medium mb-1">
                            Marca
                        </label>
                        <div className="flex items-center space-x-2">
                            <select
                                id="carBrandID"
                                name="carBrandID"
                                value={car.carBrandID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                            >
                                <option value="">Seleccione</option>
                                {availableBrands.map(b => (
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
                                value={car.carModelID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                                disabled={!car.carBrandID}
                            >
                                <option value="">Seleccione</option>
                                {availableModels.map(m => (
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

                    {/* Cliente */}
                    <div>
                        <label htmlFor="clientID" className="block text-sm font-medium mb-1">
                            Cliente
                        </label>
                        <div className="flex items-center space-x-2">
                            <select
                                id="clientID"
                                name="clientID"
                                value={car.clientID}
                                onChange={handleChange}
                                className="flex-1 border p-2 rounded"
                                required
                            >
                                <option value="">Seleccione</option>
                                {formData.clients.map(c => (
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
                            value={car.licensePlate}
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
                            value={car.year}
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
                            value={car.lastServiceMileage}
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
                                checked={car.isDebtor}
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
                            value={car.discountID}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Seleccione</option>
                            {formData.discounts.map(d => (
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
                            disabled={loading || !car.licensePlate || !car.carBrandID || !car.carModelID || !car.clientID || !car.discountID}
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
                    selectedCarBrandID={car.carBrandID || null}
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