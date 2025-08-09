import { useEffect, useState } from "react";
import { carModelOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import CarModelCreate from "./CarModelCreate";

export default function CarModels() {
  const [allModels, setAllModels] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      setLoading(true);
      const data = await carModelOperations.getAllCarModels();
      setAllModels(data);
      setModels(data);
    } catch (err) {
      console.error("Error cargando modelos de auto:", err);
      setError(err.message);
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-carmodels") {
        loadModels();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <CarModelCreate
          onSave={() => {
            popup.opener.postMessage("reload-carmodels", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Modelo de Auto"
    );
  };

  const handleFilterChange = (filtered) => setModels(filtered);

  const handleEdit = (m) => {
    openReactWindow(
      (popup) => (
        <CarModelCreate
          carModel={m}
          onSave={() => {
            popup.opener.postMessage("reload-carmodels", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Modelo de Auto"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar modelo de auto?")) return;
    try {
      await carModelOperations.deleteCarModel(id);
      loadModels();
    } catch (err) {
      alert("Error al borrar modelo de auto: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Modelos de Auto</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadModels}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Modelo
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="carmodels"
            data={allModels}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((m) => (
            <div key={m.CarModelID} className=" rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{m.Model}</h3>
              <p className="text-sm mb-2">Marca: {m.CarBrandName}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="mt-2 px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(m.CarModelID)}
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
