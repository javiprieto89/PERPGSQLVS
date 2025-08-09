// frontend/src/components/ItemSelectWindow.jsx
import { useEffect, useState } from "react";
import { itemOperations } from "~/graphql/operations.js";

export default function ItemSelectWindow({ onSelect, onClose }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});

  const fetchItems = async (term = "") => {
    try {
      const data = await itemOperations.searchItems(term, 1, 100);
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchItems(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  const filtered = items.filter((it) =>
    `${it.Code || ""} ${it.description || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    const qty = parseInt(quantities[item.itemID] || 1, 10);
    onSelect(item, qty);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Seleccionar Ítem</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="border p-2 rounded w-full"
      />
      <div className="max-h-96 overflow-y-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="">
            <tr>
              <th className="px-2 py-1 text-left">Código</th>
              <th className="px-2 py-1 text-left">Descripción</th>
              <th className="px-2 py-1 text-center">Cantidad</th>
              <th className="px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.itemID} className="hover:">
                <td className="px-2 py-1 whitespace-nowrap">{item.Code}</td>
                <td className="px-2 py-1 whitespace-nowrap">
                  {item.description}
                </td>
                <td className="px-2 py-1 text-right">
                  {item.price?.toFixed(2) ?? "-"}
                </td>
                <td className="px-2 py-1 text-center">
                  <input
                    type="number"
                    min="1"
                    className="border w-16 p-1 rounded"
                    value={quantities[item.itemID] || 1}
                    onChange={(e) =>
                      setQuantities((prev) => ({
                        ...prev,
                        [item.itemID]: e.target.value,
                      }))
                    }
                  />
                </td>
                <td className="px-2 py-1 text-right">
                  <button
                    onClick={() => handleSelect(item)}
                    className="text-primary hover:underline"
                  >
                    Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <button
          onClick={onClose}
          className="mt-4  hover: text-gray-800 px-4 py-2 rounded"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
