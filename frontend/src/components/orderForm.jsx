import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch"; // asumí que ya tenés esto

export default function OrderForm() {
  const [clients, setClients] = useState([]);
  const [salesConditions, setSalesConditions] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [items, setItems] = useState([]);

  const [selectedClient, setSelectedClient] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedPriceList, setSelectedPriceList] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

  const [orderItems, setOrderItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    apiFetch("/clients/").then(setClients);
    apiFetch("/salesconditions").then(setSalesConditions);
    apiFetch("/pricelists").then(setPriceLists);
    apiFetch("/warehouses").then(setWarehouses);
    apiFetch("/items").then(setItems);
  }, []);

  const handleAddItem = () => {
    const item = items.find((i) => i.id === parseInt(selectedItem));
    if (!item || quantity <= 0) return;

    const subtotal = item.price * quantity;

    setOrderItems([
      ...orderItems,
      {
        itemId: item.id,
        name: item.name,
        price: item.price,
        quantity,
        subtotal,
      },
    ]);

    setSelectedItem("");
    setQuantity(1);
  };

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const handleSubmit = () => {
    const payload = {
      clientId: selectedClient,
      salesConditionId: selectedCondition,
      priceListId: selectedPriceList,
      warehouseId: selectedWarehouse,
      items: orderItems.map((i) => ({
        itemId: i.itemId,
        quantity: i.quantity,
        price: i.price,
      })),
    };

    apiFetch("/orders", {
      method: "POST",
      body: payload,
    })
      .then(() => {
        alert("Pedido guardado");
        // reset
        setOrderItems([]);
        setSelectedClient("");
        setSelectedCondition("");
        setSelectedPriceList("");
        setSelectedWarehouse("");
      })
      .catch((err) => {
        alert("Error al guardar el pedido");
        console.error(err);
      });
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Nuevo Pedido</h1>

      {/* Cabecera */}
      <div className="grid grid-cols-2 gap-4">
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Seleccione cliente</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Condición de venta</option>
          {salesConditions.map((c) => (
            <option key={c.id} value={c.id}>
              {c.description}
            </option>
          ))}
        </select>

        <select
          value={selectedPriceList}
          onChange={(e) => setSelectedPriceList(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Lista de precios</option>
          {priceLists.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={selectedWarehouse}
          onChange={(e) => setSelectedWarehouse(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Depósito</option>
          {warehouses.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Agregar ítems */}
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-4 items-end">
          <select
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Seleccione ítem</option>
            {items.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name} - ${i.price}
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
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de ítems */}
      <div>
        <h2 className="text-lg font-semibold">Ítems del pedido</h2>
        {orderItems.length === 0 ? (
          <p className="text-gray-500">No hay ítems agregados</p>
        ) : (
          <table className="w-full mt-2 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Artículo</th>
                <th className="p-2">Cantidad</th>
                <th className="p-2">Precio</th>
                <th className="p-2">subtotal</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((i, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{i.name}</td>
                  <td className="border p-2">{i.quantity}</td>
                  <td className="border p-2">${i.price.toFixed(2)}</td>
                  <td className="border p-2">${i.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-right font-bold text-xl mt-4">
          total: ${total.toFixed(2)}
        </div>
      </div>

      {/* Guardar */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          Guardar Pedido
        </button>
      </div>
    </div>
  );
}
