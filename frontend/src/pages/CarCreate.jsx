import { useState, useEffect } from "react";
import { carOperations, carModelOperations, clientOperations, discountOperations, carBrandOperations } from "../utils/graphqlClient";
import CarBrandSearchModal from "../components/CarBrandSearchModal";
import CarModelSearchModal from "../components/CarModelSearchModal";
import ClientSearchModal from "../components/ClientSearchModal";

export default function CarCreate({ onClose, onSave, car: initialCar = null }) {
    const [form, setForm] = useState({
        licensePlate: "",
        year: "",
        carBrandID: "",
        carModelID: "",
        clientID: "",
        lastServiceMileage: "",
        isDebtor: false,
        discountID: "",
    });

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [clients, setClients] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [showBrandModal, setShowBrandModal] = useState(false);
    const [showModelModal, setShowModelModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [b, c, d] = await Promise.all([
                    carBrandOperations.getAllCarBrands(),
                    clientOperations.getAllClients(),
                    discountOperations.getAllDiscounts(),
                ]);
                setBrands(b);
                setClients(c);
                setDiscounts(d);
            } catch (err) {
                console.error("Error cargando datos:", err);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const loadModels = async () => {
            if (!form.carBrandID) { setModels([]); return; }
            try {
                const m = await carModelOperations.getCarModelsByBrand(form.carBrandID);
                setModels(m);
            } catch (err) {
                console.error("Error cargando modelos:", err);
            }
        };
        loadModels();
    }, [form.carBrandID]);

    useEffect(() => {
        if (initialCar) {
            setIsEdit(true);
            setForm({
                licensePlate: initialCar.LicensePlate || "",
                year: initialCar.Year || "",
                carBrandID: initialCar.CarBrandID || "",
                carModelID: initialCar.CarModelID || "",
                clientID: initialCar.ClientID || "",
                lastServiceMileage: initialCar.LastServiceMileage || "",
                isDebtor: initialCar.IsDebtor || false,
                discountID: initialCar.DiscountID || "",
            });
        }
    }, [initialCar]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const payload = {
                LicensePlate: form.licensePlate,
                Year: form.year ? parseInt(form.year) : null,
                CarModelID: parseInt(form.carModelID),
                ClientID: parseInt(form.clientID),
                LastServiceMileage: form.lastServiceMileage ? parseInt(form.lastServiceMileage) : null,
                IsDebtor: form.isDebtor,
                DiscountID: parseInt(form.discountID),
            };
            let result;
            if (isEdit) {
                result = await carOperations.updateCar(initialCar.CarID, payload);
            } else {
                result = await carOperations.createCar(payload);
            }
            onSave && onSave(result);
            onClose && onClose();
        } catch (err) {
            console.error("Error guardando auto:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">{isEdit ? 'Editar Auto' : 'Nuevo Auto'}</h2>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Marca</label>
                    <select name="carBrandID" value={form.carBrandID} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {brands.map(b => <option key={b.CarBrandID} value={b.CarBrandID}>{b.Name}</option>)}
                    </select>
                    <button type="button" onClick={() => setShowBrandModal(true)} className="absolute right-2 top-8 text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Modelo</label>
                    <select name="carModelID" value={form.carModelID} onChange={handleChange} className="w-full border p-2 rounded" required disabled={!form.carBrandID}>
                        <option value="">Seleccione</option>
                        {models.map(m => <option key={m.CarModelID} value={m.CarModelID}>{m.Model}</option>)}
                    </select>
                    <button type="button" onClick={() => setShowModelModal(true)} className="absolute right-2 top-8 text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div className="relative">
                    <label className="block text-sm font-medium mb-1">Cliente</label>
                    <select name="clientID" value={form.clientID} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {clients.map(c => <option key={c.ClientID} value={c.ClientID}>{c.FirstName} {c.LastName}</option>)}
                    </select>
                    <button type="button" onClick={() => setShowClientModal(true)} className="absolute right-2 top-8 text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Patente</label>
                    <input type="text" name="licensePlate" value={form.licensePlate} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Año</label>
                    <input type="number" name="year" value={form.year} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Kilometraje último servicio</label>
                    <input type="number" name="lastServiceMileage" value={form.lastServiceMileage} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="isDebtor" checked={form.isDebtor} onChange={handleChange} className="mr-2" />
                        <span>Deudor</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Descuento</label>
                    <select name="discountID" value={form.discountID} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Seleccione</option>
                        {discounts.map(d => <option key={d.DiscountID} value={d.DiscountID}>{d.DiscountName}</option>)}
                    </select>
                </div>
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">Cancelar</button>
                    <button type="submit" disabled={loading || !form.licensePlate || !form.carBrandID || !form.carModelID || !form.clientID || !form.discountID} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </form>
        </div>

        {showBrandModal && (
            <CarBrandSearchModal
                isOpen={true}
                onClose={() => setShowBrandModal(false)}
                onBrandSelect={(b) => setForm(prev => ({ ...prev, carBrandID: b.CarBrandID }))}
            />
        )}
        {showModelModal && (
            <CarModelSearchModal
                isOpen={true}
                onClose={() => setShowModelModal(false)}
                onModelSelect={(m) => setForm(prev => ({ ...prev, carModelID: m.CarModelID, carBrandID: m.CarBrandID }))}
            />
        )}
        {showClientModal && (
            <ClientSearchModal
                isOpen={true}
                onClose={() => setShowClientModal(false)}
                onClientSelect={(c) => setForm(prev => ({ ...prev, clientID: c.clientID }))}
            />
        )}
        </>
    );
}
