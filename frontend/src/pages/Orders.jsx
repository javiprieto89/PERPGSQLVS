import { useState } from "react";
import OrderModal from "../components/OrderModal";

export default function Orders() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Cargar Pedido
      </button>
      {showModal && <OrderModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
