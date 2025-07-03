import { useState } from "react";
import { supplierOperations } from "../utils/graphqlClient";

export default function SupplierCreate({ onClose, onSave, supplier: initialSupplier = null }) {
    const [supplier, setSupplier] = useState({
        docTypeID: null,
        docNumber: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        countryID: null,
        provinceID: null,
        isActive: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useState(() => {
        if (initialSupplier) {
            setSupplier({
                docTypeID: initialSupplier.DocTypeID,
                docNumber: initialSupplier.DocNumber || "",
                firstName: initialSupplier.FirstName || "",
                lastName: initialSupplier.LastName || "",
                phone: initialSupplier.Phone || "",
                email: initialSupplier.Email || "",
                address: initialSupplier.Address || "",
                city: initialSupplier.City || "",
                postalCode: initialSupplier.PostalCode || "",
                countryID: initialSupplier.CountryID,
                provinceID: initialSupplier.ProvinceID,
                isActive: initialSupplier.IsActive !== false,
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSupplier(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            let result;
            if (initialSupplier) {
                result = await supplierOperations.updateSupplier(initialSupplier.SupplierID, supplier);
            } else {
                result = await supplierOperations.createSupplier(supplier);
            }
            if (onSave) onSave(result);
            if (onClose) onClose();
        } catch (err) {
            console.error("Error guardando proveedor:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold">{initialSupplier ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h2>
            {error && <p className="text-red-600">{error}</p>}
            <input
                name="firstName"
                value={supplier.firstName}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full border p-2"
            />
            <input
                name="lastName"
                value={supplier.lastName}
                onChange={handleChange}
                placeholder="Apellido"
                className="w-full border p-2"
            />
            <input
                name="email"
                value={supplier.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2"
            />
            <input
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full border p-2"
            />
            <input
                name="address"
                value={supplier.address}
                onChange={handleChange}
                placeholder="Dirección"
                className="w-full border p-2"
            />
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="isActive"
                    checked={supplier.isActive}
                    onChange={handleChange}
                />
                Activo
            </label>
            <div className="flex justify-end gap-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-300 px-4 py-2 rounded"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Guardando...' : 'Guardar Proveedor'}
                </button>
            </div>
        </form>
    );
}
