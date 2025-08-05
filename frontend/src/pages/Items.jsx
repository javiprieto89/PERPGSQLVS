import { useEffect, useState } from "react";
import { itemOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import ItemCreate from "./ItemCreate";

export default function Items() {
  const [allItems, setAllItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-items") {
        loadItems();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await itemOperations.getAllItems();
      setAllItems(data);
      setItems(data);
    } catch (err) {
      console.error("Error cargando ítems:", err);
      setError(err.message);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <ItemCreate
          onSave={() => {
            popup.opener.postMessage("reload-items", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Ítem"
    );
  };

  const handleFilterChange = (filtered) => {
    setItems(filtered);
  };

  const handleEdit = (item) => {
    openReactWindow(
      (popup) => (
        <ItemCreate
          item={item}
          onSave={() => {
            popup.opener.postMessage("reload-items", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Ítem"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar ítem?")) return;
    try {
      await itemOperations.deleteItem(id);
      loadItems();
    } catch (err) {
      alert("Error al borrar ítem: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Ítems</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadItems}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Ítem
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="items"
            data={allItems}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-destructive mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.ItemID} className=" rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{it.Description}</h3>
              <p className="text-sm mb-2">Código: {it.Code}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(it)}
                  className="mt-2 px-3 py-1  text-sm rounded hover:"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(it.ItemID)}
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
