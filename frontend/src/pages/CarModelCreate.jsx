import { useEffect, useState } from "react";
import {
  carBrandOperations,
  carModelOperations,
} from "~/graphql/operations.js";

export default function CarModelCreate({
  onClose,
  onSave,
  carModel: initialCarModel = null,
}) {
  const [carBrandID, setCarBrandID] = useState("");
  const [model, setModel] = useState("");
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const b = await carBrandOperations.getAllCarBrands();
        setBrands(b);
      } catch (err) {
        console.error("Error cargando marcas de auto:", err);
      }
    };
    loadBrands();
  }, []);

  useEffect(() => {
    if (initialCarModel) {
      setIsEdit(true);
      setCarBrandID(initialCarModel.CarBrandID || "");
      setModel(initialCarModel.Model || "");
    }
  }, [initialCarModel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      const payload = { CarBrandID: parseInt(carBrandID), Model: model };
      if (isEdit) {
        result = await carModelOperations.updateCarModel(
          initialCarModel.CarModelID,
          payload
        );
      } else {
        result = await carModelOperations.createCarModel(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando modelo de auto:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Modelo de Auto" : "Nuevo Modelo de Auto"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Marca de auto
          </label>
          <select
            value={carBrandID}
            onChange={(e) => setCarBrandID(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {brands.map((b) => (
              <option key={b.CarBrandID} value={b.CarBrandID}>
                {b.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Modelo</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border p-2 rounded"
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
            disabled={loading || !carBrandID || !model.trim()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
