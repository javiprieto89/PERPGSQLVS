// frontend/src/pages/VendorCreate.jsx
import { useEffect, useState } from "react";
import { vendorOperations } from "~/graphql/operations.js";

export default function VendorCreate({
  onClose,
  onSave,
  vendor: initialVendor = null,
}) {
  const [vendorName, setVendorName] = useState("");
  const [commission, setCommission] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialVendor) {
      setIsEdit(true);
      setVendorName(initialVendor.VendorName || "");
      setCommission(initialVendor.Commission ?? "");
      setIsActive(initialVendor.IsActive !== false);
    }
  }, [initialVendor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        VendorName: vendorName,
        Commission: commission === "" ? null : parseFloat(commission),
        IsActive: isActive,
      };
      let result;
      if (isEdit) {
        result = await vendorOperations.updateVendor(
          initialVendor.VendorID,
          payload
        );
      } else {
        result = await vendorOperations.createVendor(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando vendedor:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Vendedor" : "Nuevo Vendedor"}
      </h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Comisión</label>
          <input
            type="number"
            step="0.01"
            value={commission}
            onChange={(e) => setCommission(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="inline-flex items-center mt-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <span>Vendedor activo</span>
          </label>
        </div>
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
            disabled={loading || !vendorName.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
