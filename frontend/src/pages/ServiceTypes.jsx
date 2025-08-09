// frontend/src/pages/ServiceTypes.jsx
import { useEffect, useState } from "react";
import { serviceTypeOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import ServiceTypeCreate from "./ServiceTypeCreate";

export default function ServiceTypes() {
  const [allServiceTypes, setAllServiceTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadServiceTypes();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-servicetypes") {
        loadServiceTypes();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadServiceTypes = async () => {
    try {
      setLoading(true);
      const data = await serviceTypeOperations.getAllServicetypes();
      setAllServiceTypes(data);
      setServiceTypes(data);
    } catch (err) {
      console.error("Error cargando tipos de servicio:", err);
      setError(err.message);
      setServiceTypes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <ServiceTypeCreate
          onSave={() => {
            popup.opener.postMessage("reload-servicetypes", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Tipo de Servicio"
    );
  };

  const handleFilterChange = (filtered) => setServiceTypes(filtered);

  const handleEdit = (st) => {
    openReactWindow(
      (popup) => (
        <ServiceTypeCreate
          serviceType={st}
          onSave={() => {
            popup.opener.postMessage("reload-servicetypes", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Tipo de Servicio"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar tipo de servicio?")) return;
    try {
      await serviceTypeOperations.deleteServicetype(id);
      loadServiceTypes();
    } catch (err) {
      alert("Error al borrar tipo de servicio: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Tipos de Servicio
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadServiceTypes}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Tipo
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="servicetypes"
            data={allServiceTypes}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceTypes.map((st) => (
            <div key={st.ServiceTypeID} className=" rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{st.Type}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(st)}
                  className="mt-2 px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(st.ServiceTypeID)}
                  className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
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
