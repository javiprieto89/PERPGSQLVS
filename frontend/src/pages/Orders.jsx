// src/pages/Orders.jsx
import { useEffect, useState } from "react";
import OrderCreate from "./OrderCreate";
import {
    orderOperations,
    clientOperations,
    saleConditionOperations,
    userOperations,
    vendorOperations
} from "../utils/graphqlClient";
import { openReactWindow } from "../utils/openReactWindow";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [clients, setClients] = useState([]);
    const [saleConditions, setSaleConditions] = useState([]);
    const [users, setUsers] = useState([]);
    const [vendors, setVendors] = useState([]);

    const fetchOrders = async () => {
        try {
            const [ord, cli, sc, us, ven] = await Promise.all([
                orderOperations.getAllOrders(),
                clientOperations.getAllClients(),
                saleConditionOperations.getAllSaleConditions(),
                userOperations.getAllUsers(),
                vendorOperations.getAllVendors()
            ]);
            setOrders(ord);
            setClients(cli);
            setSaleConditions(sc);
            setUsers(us);
            setVendors(ven);
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

    const handleEdit = (order) => {
        openReactWindow(
            (popup) => (
                <OrderCreate
                    order={order}
                    onSave={() => {
                        popup.opener.postMessage("reload-orders", "*");
                        popup.close();
                    }}
                    onClose={() => popup.close()}
                />
            ),
            "Editar Pedido"
        );
    };

    const handleDelete = async (id) => {
        if (!confirm("¿Borrar pedido?")) return;
        try {
            await orderOperations.deleteOrder(id);
            fetchOrders();
        } catch (err) {
            alert("Error al borrar pedido: " + err.message);
        }
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
                            <th className="px-2">Acciones</th>
                            <th className="px-2">Cliente</th>
                            <th className="px-2">Total</th>
                            <th className="px-2">Condición</th>
                            <th className="px-2">Usuario</th>
                            <th className="px-2">Fecha</th>
                            <th className="px-2">Vendedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((o) => {
                            const client = clients.find(c => c.ClientID === o.ClientID);
                            const saleCond = saleConditions.find(sc => sc.SaleConditionID === o.SaleConditionID);
                            const user = users.find(u => u.UserID === o.UserID);
                            const vendor = client ? vendors.find(v => v.VendorID === client.VendorID) : null;
                            return (
                                <tr key={o.OrderID} className="border-t">
                                    <td className="px-2 text-center whitespace-nowrap">
                                        <button onClick={() => handleEdit(o)} className="text-blue-600 mr-2">✎</button>
                                        <button onClick={() => handleDelete(o.OrderID)} className="text-red-600">🗑</button>
                                    </td>
                                    <td className="px-2">
                                        {client ? `${client.FirstName} ${client.LastName || ''}` : o.ClientID}
                                    </td>
                                    <td className="px-2 text-right">{o.Total?.toFixed(2)}</td>
                                    <td className="px-2">{saleCond?.Name || ''}</td>
                                    <td className="px-2">{user?.FullName || user?.Nickname || ''}</td>
                                    <td className="px-2">{o.Date_?.slice(0, 10)}</td>
                                    <td className="px-2">{vendor?.VendorName || ''}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}