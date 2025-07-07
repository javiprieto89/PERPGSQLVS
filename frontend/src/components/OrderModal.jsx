import { useEffect, useState } from "react";
import {
  clientOperations,
  pricelistOperations,
  warehouseOperations,
  saleConditionOperations,
  orderOperations,
} from "../utils/graphqlClient";
import ItemSelectWindow from "./ItemSelectWindow";
import ClientSearchModal from "./ClientSearchModal";
import SaleConditionSearchModal from "./SaleConditionSearchModal";
import { openReactWindow } from "../utils/openReactWindow";
import { v4 as uuidv4 } from "uuid";

export default function OrderModal({ onClose }) {
  const [clients, setClients] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [salesConditions, setSalesConditions] = useState([]);
  const [tempItems, setTempItems] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showSCModal, setShowSCModal] = useState(false);

  const [order, setOrder] = useState({
    clientId: "",
    priceListId: "",
    warehouseId: "",
    salesConditionId: "",
    uuid: uuidv4(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const [c, p, w, s] = await Promise.all([
        clientOperations.getAllClients(),
        pricelistOperations.getAllPricelists(),
        warehouseOperations.getAllWarehouses(),
        saleConditionOperations.getAllSaleConditions(),
      ]);
      setClients(c);
      setPriceLists(p);
      setWarehouses(w);
      setSalesConditions(s);
    };
    fetchData();
  }, []);

  const openItemWindow = () => {
    openReactWindow(
      (popup) => (
        <ItemSelectWindow
          onSelect={(item, qty) => {
            popup.opener.postMessage(
              { type: "item-selected", item, quantity: qty },
              "*"
            );
            popup.close();
          }}
          onClose={() => popup.close()}
        />
      ),
      "Seleccionar Ítem"
    );
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.data && e.data.type === "item-selected") {
        const { item, quantity } = e.data;
        setTempItems((prev) => [
          ...prev,
          {
            tempId: uuidv4(),
            itemId: item.ItemID || item.itemID,
            code: item.Code,
            description: item.description,
            quantity,
            price: item.price || 0,
          },
        ]);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

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
      if (window.opener) {
        window.opener.postMessage('reload-orders', '*');
      }
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
          <div className="relative">
            <select
              value={order.clientId}
              onChange={(e) =>
                setOrder({ ...order, clientId: parseInt(e.target.value) })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Cliente</option>
              {clients.map((c) => (
                <option key={c.clientID} value={c.clientID}>
                  {c.firstName || c.FirstName} {c.lastName || c.LastName || ""}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowClientModal(true)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <div className="relative">
            <select
              value={order.salesConditionId}
              onChange={(e) =>
                setOrder({
                  ...order,
                  salesConditionId: parseInt(e.target.value),
                })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Condición de venta</option>
              {salesConditions.map((s) => (
                <option key={s.saleConditionID} value={s.saleConditionID}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowSCModal(true)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

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

        <div className="mb-4">
          <button
            onClick={openItemWindow}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Agregar Ítem
          </button>
        </div>

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
      {showClientModal && (
        <ClientSearchModal
          isOpen={showClientModal}
          onClose={() => setShowClientModal(false)}
          onClientSelect={(client) => {
            setOrder({ ...order, clientId: client.ClientID || client.clientID });
            setShowClientModal(false);
          }}
        />
      )}
      {showSCModal && (
        <SaleConditionSearchModal
          isOpen={showSCModal}
          onClose={() => setShowSCModal(false)}
          onSelect={(sc) => {
            setOrder({ ...order, salesConditionId: sc.saleConditionID });
            setShowSCModal(false);
          }}
        />
      )}
    </div>
  );
}
