// src/components/ItemSelectModal.jsx
import { useEffect, useState } from "react";
import { itemOperations } from "../utils/graphqlClient";

export default function ItemSelectModal({ isOpen, onSelect, onClose }) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (!isOpen) return;
    const fetchItems = async (term = "") => {
      try {
        const data = await itemOperations.searchItems(term, 1, 100);
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      }
    };
    fetchItems();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const delay = setTimeout(async () => {
      try {
        const data = await itemOperations.searchItems(search, 1, 100);
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [search, isOpen]);

  if (!isOpen) return null;

  const filtered = items.filter((it) =>
    `${it.Code || ""} ${it.description || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSelect = (item) => {
    const qty = parseInt(quantities[item.itemID] || 1, 10);
    onSelect(item, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-start pt-10">
      <div className="relative mx-auto p-4 w-full max-w-3xl shadow-lg rounded-md bg-white space-y-4">
        <div className="flex justify-between items-center pb-3 border-b">
          <h2 className="text-xl font-semibold">Seleccionar Ítem</h2>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="border p-2 rounded w-full"
        />
        <div className="max-h-96 overflow-y-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 text-left">Código</th>
                <th className="px-2 py-1 text-left">Descripción</th>
                <th className="px-2 py-1 text-center">Cantidad</th>
                <th className="px-2 py-1" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.itemID} className="hover:bg-gray-50">
                  <td className="px-2 py-1 whitespace-nowrap">{item.Code}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{item.description}</td>
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
                      className="text-blue-600 hover:underline"
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
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
