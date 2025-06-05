import { useState } from "react";
import apiFetch from "../utils/apiFetch";

export default function SupplierCreate() {
  const [supplier, setSupplier] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    Contact: "",
    CUIT: "",
    isActive: true,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSupplier((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiFetch("/suppliers/", {
        method: "POST",
        body: supplier,
      });
      window.close(); // ✅ Cierra la ventana popup
    } catch (e) {
      console.error(e);
      setError("Error al guardar el proveedor");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Nuevo Proveedor</h2>
      {error && <p className="text-red-600">{error}</p>}

      {[
        { name: "name", placeholder: "Nombre" },
        { name: "address", placeholder: "Dirección" },
        { name: "phone", placeholder: "Teléfono" },
        { name: "email", placeholder: "email" },
        { name: "Contact", placeholder: "Contacto" },
        { name: "CUIT", placeholder: "CUIT" },
      ].map((field) => (
        <input
          key={field.name}
          name={field.name}
          value={supplier[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="w-full border p-2"
        />
      ))}

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
          onClick={() => window.close()}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar Proveedor
        </button>
      </div>
    </form>
  );
}
