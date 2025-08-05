// frontend/src/pages/ServiceTypeCreate.jsx
import { useEffect, useState } from "react";
import { serviceTypeOperations } from "~/graphql/operations.js";

export default function ServiceTypeCreate({
  onClose,
  onSave,
  serviceType: initialST = null,
}) {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialST) {
      setIsEdit(true);
      setType(initialST.Type || "");
    }
  }, [initialST]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await serviceTypeOperations.updateServicetype(
          initialST.ServiceTypeID,
          { Type: type }
        );
      } else {
        result = await serviceTypeOperations.createServicetype({ Type: type });
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando tipo de servicio:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Tipo de Servicio" : "Nuevo Tipo de Servicio"}
      </h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
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
            disabled={loading || !type.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
