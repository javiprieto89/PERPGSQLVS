// frontend/src/pages/Discounts.jsx
import { useEffect, useState } from "react";
import { discountOperations } from "~/graphql/operations.js";
import TableFilters from "../components/TableFilters";
import { openReactWindow } from "../utils/openReactWindow";
import DiscountCreate from "./DiscountCreate";

export default function Discounts() {
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadDiscounts();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-discounts") {
        loadDiscounts();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const loadDiscounts = async () => {
    try {
      setLoading(true);
      const data = await discountOperations.getAllDiscounts();
      setAllDiscounts(data);
      setDiscounts(data);
    } catch (err) {
      setError(err.message);
      setDiscounts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    openReactWindow(
      (popup) => (
        <DiscountCreate
          onSave={() => {
            popup.opener.postMessage("reload-discounts", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Nuevo Descuento"
    );
  };

  const handleFilterChange = (filtered) => {
    setDiscounts(filtered);
  };

  const handleEdit = (discount) => {
    openReactWindow(
      (popup) => (
        <DiscountCreate
          discount={discount}
          onSave={() => {
            popup.opener.postMessage("reload-discounts", "*");
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Editar Descuento"
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Borrar descuento?")) return;
    try {
      await discountOperations.deleteDiscount(id);
      loadDiscounts();
    } catch (err) {
      alert("Error al borrar descuento: " + err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Descuentos</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            {showFilters ? "Ocultar Filtros" : "Mostrar Filtros"}
          </button>
          <button
            onClick={loadDiscounts}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recargar
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Nuevo Descuento
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-6">
          <TableFilters
            modelName="discounts"
            data={allDiscounts}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discounts.map((d) => (
            <div key={d.DiscountID} className="bg-white rounded shadow p-4">
              <h3 className="text-lg font-semibold mb-2">{d.DiscountName}</h3>
              <p className="text-sm mb-1">Porcentaje: {d.Percentage}%</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="mt-2 px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(d.DiscountID)}
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
