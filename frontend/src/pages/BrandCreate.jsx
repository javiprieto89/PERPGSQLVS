import { useEffect, useState } from "react";
import { brandOperations, companyOperations } from "~/graphql/operations";

export default function BrandCreate({
  onClose,
  onSave,
  brand: initialBrand = null,
}) {
  const [name, setName] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await companyOperations.getAllCompanies();
        setCompanies(res);
      } catch (err) {
        console.error("Error cargando compañías:", err);
      }
    };
    loadCompanies();

    if (initialBrand) {
      setIsEdit(true);
      setName(initialBrand.Name || "");
      setIsActive(initialBrand.IsActive !== false);
      setCompanyID(initialBrand.CompanyID || "");
    }
  }, [initialBrand]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      const payload = {
        Name: name,
        IsActive: isActive,
        CompanyID: parseInt(companyID),
      };
      if (isEdit) {
        result = await brandOperations.updateBrand(
          initialBrand.BrandID,
          payload
        );
      } else {
        result = await brandOperations.createBrand(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando marca:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Marca" : "Nueva Marca"}
      </h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Compañía</label>
          <select
            value={companyID}
            onChange={(e) => setCompanyID(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Seleccione</option>
            {companies.map((c) => (
              <option key={c.CompanyID} value={c.CompanyID}>
                {c.Name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
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
            <span>Marca activa</span>
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
            disabled={loading || !name.trim() || !companyID}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
