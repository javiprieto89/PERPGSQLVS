// frontend/src/pages/CompanyData.jsx
import { useEffect, useState } from "react";
import { companyOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CompanyCreate from "./CompanyCreate";

export default function CompanyData() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyOperations.getAllCompanies();
      setAllCompanies(data);
      setCompanies(data);
    } catch (err) {
      console.error("Error cargando compañías:", err);
      setError(err.message);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-companies") {
        loadCompanies();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <CompanyCreate
          onSave={() => {
            popup.opener.postMessage("reload-companies", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Empresa"
    );
  };

  const handleFilterChange = (filtered) => setCompanies(filtered);

  const handleEdit = (c) => {
    openReactWindow(
      (popup) => (
        <CompanyCreate
          company={c}
          onSave={() => {
            popup.opener.postMessage("reload-companies", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Empresa"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar empresa?")) return;
    try {
      await companyOperations.deleteCompany(id);
      loadCompanies();
    } catch (err) {
      alert("Error al borrar empresa: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Empresas</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadCompanies}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nueva Empresa
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="companydata"
            data={allCompanies}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c) => (
            <div key={c.CompanyID} className=" rounded shadow p-4">
              {c.Logo && (
                <img
                  src={`data:image/*;base64,${c.Logo}`}
                  alt="Logo"
                  className="h-16 mb-2 object-contain"
                />
              )}
              <h3 className="text-lg font-semibold mb-1">{c.Name}</h3>
              <p className="text-sm mb-1">{c.Address}</p>
              {c.CUIT && <p className="text-sm mb-1">CUIT: {c.CUIT}</p>}
              {c.Grossincome && (
                <p className="text-sm mb-1">Ingresos brutos: {c.Grossincome}</p>
              )}
              {c.Startdate && (
                <p className="text-sm mb-1">
                  Inicio: {c.Startdate.slice(0, 10)}
                </p>
              )}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(c.CompanyID)}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
