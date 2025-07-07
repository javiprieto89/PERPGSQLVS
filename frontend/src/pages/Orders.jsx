import { useEffect, useState } from "react";
import OrderCreate from "./OrderCreate";
import { orderOperations } from "../utils/graphqlClient";
import { openReactWindow } from "../utils/openReactWindow";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const data = await orderOperations.getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    const handler = (e) => {
      if (e.data === "reload-orders") {
        fetchOrders();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleCreate = () => {
    openReactWindow(() => <OrderCreate />, "Cargar Pedido");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cargar Pedido
      </button>
      {orders.length > 0 && (
        <table className="w-full mt-4 table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2">ID</th>
              <th className="px-2">Fecha</th>
              <th className="px-2">Cliente</th>
              <th className="px-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderID} className="border-t">
                <td className="px-2 text-center">{o.orderID}</td>
                <td className="px-2">{o.date?.slice(0, 10)}</td>
                <td className="px-2 text-center">{o.clientID ?? ""}</td>
                <td className="px-2 text-right">{o.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
