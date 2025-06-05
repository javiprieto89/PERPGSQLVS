import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";

export default function OrderCreate() {
  const [clients, setClients] = useState([]);
  const [salesConditions, setSalesConditions] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);

  const [order, setOrder] = useState({
    clientId: "",
    salesConditionId: "",
    priceListId: "",
    warehouseId: "",
    items: [],
  });

  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiFetch("/clients/").then(setClients);
    apiFetch("/salesconditions").then(setSalesConditions);
    apiFetch("/pricelists").then(setPriceLists);
    apiFetch("/warehouses").then(setWarehouses);
    apiFetch("/items").then(setItems);
  }, []);

  const handleAddItem = () => {
    const item = items.find((i) => i.itemID === parseInt(selectedItemId));
    if (!item) return;

    const newItem = {
      itemId: item.itemID,
      quantity: quantity,
      price: item.price || 0,
    };

    setOrder((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));

    setSelectedItemId("");
    setQuantity(1);
  };

  const handleSubmit = async () => {
    try {
      await apiFetch("/orders", {
        method: "POST",
        body: order,
      });
      alert("Pedido cargado exitosamente");
      setOrder({
        clientId: "",
        salesConditionId: "",
        priceListId: "",
        warehouseId: "",
        items: [],
      });
    } catch (error) {
      console.error("Error al guardar pedido:", error);
      alert("Error al guardar pedido");
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Cargar Pedido</h1>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={order.clientId}
          onChange={(e) =>
            setOrder({ ...order, clientId: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
        >
          <option value="">Seleccione cliente</option>
          {clients.map((c) => (
            <option key={c.clientID} value={c.clientID}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={order.salesConditionId}
          onChange={(e) =>
            setOrder({ ...order, salesConditionId: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
        >
          <option value="">Condición de venta</option>
          {salesConditions.map((s) => (
            <option key={s.salesConditionID} value={s.salesConditionID}>
              {s.description}
            </option>
          ))}
        </select>

        <select
          value={order.priceListId}
          onChange={(e) =>
            setOrder({ ...order, priceListId: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
        >
          <option value="">Lista de precios</option>
          {priceLists.map((p) => (
            <option key={p.priceListID} value={p.priceListID}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={order.warehouseId}
          onChange={(e) =>
            setOrder({ ...order, warehouseId: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
        >
          <option value="">Depósito</option>
          {warehouses.map((w) => (
            <option key={w.warehouseID} value={w.warehouseID}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 items-end">
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Seleccione ítem</option>
          {items.map((i) => (
            <option key={i.itemID} value={i.itemID}>
              {i.description}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="border p-2 rounded"
        />

        <button
          onClick={handleAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar ítem
        </button>
      </div>

      {order.items.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold">Ítems del pedido</h2>
          <ul className="divide-y divide-gray-200">
            {order.items.map((item, idx) => (
              <li key={idx} className="py-2 flex justify-between">
                <span>ID: {item.itemId}</span>
                <span>Cant: {item.quantity}</span>
                <span>Precio: ${item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Guardar Pedido
        </button>
      </div>
    </div>
  );
}
