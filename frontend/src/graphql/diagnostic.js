// frontend/src/graphql/diagnostic.js
import { graphqlClient } from "~/graphql/graphqlClient.js";
import { clientOperations, orderOperations } from "./operations.js";

// ===== DIAGNÓSTICO =====
export const diagnosticGraphQL = () => {
    let singleton = false;

    async function startDiagnostic() {
        if (singleton) return;
        singleton = true;

        console.log("🔍 Iniciando diagnóstico de GraphQL...");

        try {
            // 1. Verificar conectividad básica
            console.log("1. Verificando conectividad...");
            const isConnected = await graphqlClient.checkConnection();
            if (!isConnected) throw new Error("❌ No se puede conectar al servidor GraphQL");
            console.log("Conectividad: ✅ OK");

            console.log("2. Probando consulta de clientes...");
            const clients = await clientOperations.getAllClients();
            if (!clients) throw new Error("❌ Error obteniendo clientes:");
            console.log("✅ Clientes obtenidos:", clients.length);

            console.log("3. Probando consulta de órdenes...");
            const orders = await orderOperations.getAllOrders();
            if (!orders) throw new Error("❌ Error obteniendo órdenes:");
            console.log("✅ Órdenes obtenidas:", orders.length);

            console.log("4. Probando datos del formulario...");
            const formData = await clientOperations.getClientFormData();
            if (!formData) throw new Error("❌ Error obteniendo datos del formulario:");
            console.log("✅ Tipos de documento:", formData?.documentTypes?.length);
            console.log("✅ Países:", formData.countries.length);
            console.log("✅ Provincias:", formData.provinces.length);
            console.log("✅ Listas de precios:", formData.priceLists.length);
            console.log("✅ Vendedores:", formData.vendors.length);

            console.log("✅ Diagnóstico completado exitosamente");

        } catch (error) {
            console.error(error.message);
            return false;
        }

        return true;
    }

    return {
        startDiagnostic
    }
};
