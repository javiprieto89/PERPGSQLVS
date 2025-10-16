// frontend/src/pages/CompanyCreate.jsx
import { useEffect, useState } from "react";
import { companyOperations } from "~/services/company.service";

export function CompanyForm({
  onClose = () => { },
  onSave = () => { },
  company: initialCompany = null,
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [cuit, setCuit] = useState("");
  const [grossIncome, setGrossIncome] = useState("");
  const [startDate, setStartDate] = useState("");
  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (initialCompany) {
      setIsEdit(true);
      setName(initialCompany.Name || "");
      setAddress(initialCompany.Address || "");
      setCuit(initialCompany.CUIT || "");
      setGrossIncome(initialCompany.Grossincome || "");
      setStartDate(
        initialCompany.Startdate ? initialCompany.Startdate.slice(0, 10) : ""
      );
      setLogo(initialCompany.Logo || "");
      setLogoPreview(
        initialCompany.Logo ? `data:image/*;base64,${initialCompany.Logo}` : ""
      );
    }
  }, [initialCompany]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = {
        Name: name,
        Address: address,
        CUIT: cuit,
        Grossincome: grossIncome || null,
        Startdate: startDate ? new Date(startDate).toISOString() : null,
        Logo: logo || null,
      };
      let result;
      if (isEdit) {
        result = await companyOperations.updateCompany(
          initialCompany.CompanyID,
          payload
        );
      } else {
        result = await companyOperations.createCompany(payload);
      }
      onSave && onSave(result);
      onClose && onClose();
    } catch (err) {
      console.error("Error guardando compañía:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Editar Empresa" : "Nueva Empresa"}
      </h2>
      {error && <div className="text-destructive mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CUIT</label>
          <input
            type="text"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Ingresos brutos
          </label>
          <input
            type="text"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Fecha de inicio
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                const result = ev.target?.result;
                if (typeof result === "string") {
                  const base64 = result.split(",")[1] || result;
                  setLogo(base64);
                  setLogoPreview(result);
                }
              };
              reader.readAsDataURL(file);
            }}
            className="w-full border p-2 rounded"
          />
          {logoPreview && (
            <img
              src={logoPreview}
              alt="Logo"
              className="mt-2 h-20 object-contain"
            />
          )}
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
            disabled={loading || !name.trim()}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
