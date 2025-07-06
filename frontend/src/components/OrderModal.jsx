import { useEffect, useState } from "react";
import {
  clientOperations,
  pricelistOperations,
  warehouseOperations,
  saleConditionOperations,
  itemOperations,
  orderOperations,
} from "../utils/graphqlClient";
import { v4 as uuidv4 } from "uuid";

export default function OrderModal({ onClose }) {
  const [clients, setClients] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [salesConditions, setSalesConditions] = useState([]);
  const [items, setItems] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");

  const [order, setOrder] = useState({
    clientId: "",
    priceListId: "",
    warehouseId: "",
    salesConditionId: "",
    uuid: uuidv4(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const [c, p, w, s, i] = await Promise.all([
        clientOperations.getAllClients(),
        pricelistOperations.getAllPricelists(),
        warehouseOperations.getAllWarehouses(),
        saleConditionOperations.getAllSaleConditions(),
        itemOperations.getAllItems(),
      ]);
      setClients(c);
      setPriceLists(p);
      setWarehouses(w);
      setSalesConditions(s);
      setItems(i);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    const item = items.find((i) => i.itemID === parseInt(selectedItemId));
    if (!item) return;
    const newItem = {
      tempId: uuidv4(),
      itemId: item.itemID,
      code: item.code,
      description: item.description,
      quantity,
      price: parseFloat(price || 0),
    };
    setTempItems((prev) => [...prev, newItem]);
    setSelectedItemId("");
    setQuantity(1);
    setPrice("");
  };

  const handleDeleteItem = (id) => {
    setTempItems((prev) => prev.filter((i) => i.tempId !== id));
  };

  const handleEditItem = (id, field, value) => {
    setTempItems((prev) =>
      prev.map((i) =>
        i.tempId === id
          ? {
              ...i,
              [field]:
                field === "price" || field === "quantity"
                  ? parseFloat(value)
                  : value,
            }
          : i
      )
    );
  };

  const total = tempItems.reduce((acc, i) => acc + i.quantity * i.price, 0);

  const handleSave = async () => {
    try {
      await orderOperations.createOrder({
        ...order,
        Items: tempItems.map(({ tempId, itemId, code, description, quantity, price }) => ({
          OrderID: 0,
          ItemID: itemId,
          Quantity: quantity,
          UnitPrice: price,
          Description: description,
        })),
      });
      alert("Pedido guardado");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[900px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Cargar Pedido</h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <select
            value={order.clientId}
            onChange={(e) =>
              setOrder({ ...order, clientId: parseInt(e.target.value) })
            }
            className="border p-2 rounded"
          >
            <option value="">Cliente</option>
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

        <div className="grid grid-cols-3 gap-4 mb-4">
          <select
            value={selectedItemId}
            onChange={(e) => setSelectedItemId(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Seleccionar artículo</option>
            {items.map((i) => (
              <option key={i.itemID} value={i.itemID}>
                {i.code} - {i.description}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border p-2 rounded"
            placeholder="Cantidad"
          />

          <input
            type="number"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 rounded"
            placeholder="Precio"
          />
        </div>

        <button
          onClick={handleAddItem}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Agregar ítem
        </button>

        {tempItems.length > 0 && (
          <div className="mb-4">
            <table className="w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2">Código</th>
                  <th className="px-2">Descripción</th>
                  <th className="px-2">Cantidad</th>
                  <th className="px-2">Precio</th>
                  <th className="px-2">total</th>
                  <th className="px-2"></th>
                </tr>
              </thead>
              <tbody>
                {tempItems.map((item) => (
                  <tr key={item.tempId}>
                    <td className="px-2">{item.code}</td>
                    <td className="px-2">{item.description}</td>
                    <td className="px-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleEditItem(
                            item.tempId,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="w-16 border rounded text-center"
                      />
                    </td>
                    <td className="px-2">
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleEditItem(item.tempId, "price", e.target.value)
                        }
                        className="w-20 border rounded text-center"
                      />
                    </td>
                    <td className="px-2">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                    <td className="px-2">
                      <button
                        onClick={() => handleDeleteItem(item.tempId)}
                        className="text-red-500 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-2 font-semibold">
              total: ${total.toFixed(2)}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
