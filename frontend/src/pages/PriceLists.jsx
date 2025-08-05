// frontend/src/pages/PriceLists.jsx
import { useEffect, useState } from "react";
import { pricelistOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import PriceListCreate from "./PriceListCreate";

export default function PriceLists() {
  const [allLists, setAllLists] = useState([]);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadLists();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-pricelists") {
        loadLists();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadLists = async () => {
    try {
      setLoading(true);
      const data = await pricelistOperations.getAllPricelists();
      setAllLists(data);
      setLists(data);
    } catch (err) {
      console.error("Error cargando listas:", err);
      setError(err.message);
      setLists([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <PriceListCreate
          onSave={() => {
            popup.opener.postMessage("reload-pricelists", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nueva Lista"
    );
  };

  const handleFilterChange = (filtered) => {
    setLists(filtered);
  };

  const handleEdit = (pl) => {
    openReactWindow(
      (popup) => (
        <PriceListCreate
          pricelist={pl}
          onSave={() => {
            popup.opener.postMessage("reload-pricelists", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Lista"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar lista de precios?")) return;
    try {
      await pricelistOperations.deletePricelist(id);
      loadLists();
    } catch (err) {
      alert("Error al borrar lista de precios: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">
          Listas de precios
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadLists}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nueva Lista
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="pricelists"
            data={allLists}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lists.map((pl) => (
            <div key={pl.PriceListID} className=" rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{pl.Name}</h3>
              <p className="text-sm mb-2">{pl.Description}</p>
              <p className="text-sm mb-2">
                Activo: {pl.IsActive ? "Sí" : "No"}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(pl)}
                  className="mt-2 px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pl.PriceListID)}
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
