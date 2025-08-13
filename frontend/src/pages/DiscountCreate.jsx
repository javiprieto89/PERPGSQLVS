// frontend/src/pages/DiscountCreate.jsx
import { useEffect, useState } from "react";
import { discountOperations } from "~/graphql/operations.js";

export default function DiscountCreate({
  onClose,
  onSave,
  discount: initialDiscount = null,
}) {
  const [discountName, setDiscountName] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialDiscount) {
      setIsEdit(true);
      setDiscountName(initialDiscount.DiscountName || "");
      setPercentage(initialDiscount.Percentage || 0);
    }
  }, [initialDiscount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isEdit) {
        result = await discountOperations.updateDiscount(
          initialDiscount.DiscountID,
          {
            DiscountName: discountName,
            Percentage: parseFloat(percentage),
          }
        );
      } else {
        result = await discountOperations.createDiscount({
          DiscountName: discountName,
          Percentage: parseFloat(percentage),
        });
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando descuento:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Descuento" : "Nuevo Descuento"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={discountName}
            onChange={(e) => setDiscountName(e.target.value)}
            className="w-full border  p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Porcentaje</label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full border  p-2 rounded"
            step="0.01"
            required
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border  rounded hover: disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading || !discountName.trim()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
