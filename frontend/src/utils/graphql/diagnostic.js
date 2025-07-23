// frontend/src/utils/graphql/diagnostic.js
import { graphqlClient } from "./baseClient.js";
import { clientOperations, orderOperations } from "./operations.js";

// ===== DIAGNÓSTICO =====
export const diagnosticGraphQL = async () => {
    console.log("🔍 Iniciando diagnóstico de GraphQL...");

    // 1. Verificar conectividad básica
    console.log("1. Verificando conectividad...");
    const isConnected = await graphqlClient.checkConnection();
    console.log("   Conectividad:", isConnected ? "✅ OK" : "❌ FALLO");

    if (!isConnected) {
        console.error("❌ No se puede conectar al servidor GraphQL");
        return false;
    }

    // 2. Probar consulta de clientes
    console.log("2. Probando consulta de clientes...");
    try {
        const clients = await clientOperations.getAllClients();
        console.log("   ✅ Clientes obtenidos:", clients.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo clientes:", error.message);
        return false;
    }

    // 3. Probar consulta de órdenes
    console.log("3. Probando consulta de órdenes...");
    try {
        const orders = await orderOperations.getAllOrders();
        console.log("   ✅ Órdenes obtenidas:", orders.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo órdenes:", error.message);
        return false;
    }

    // 4. Probar datos del formulario
    console.log("4. Probando datos del formulario...");
    try {
        const formData = await clientOperations.getClientFormData();
        console.log("   ✅ Tipos de documento:", formData.sysDocTypes.length);
        console.log("   ✅ Países:", formData.countries.length);
        console.log("   ✅ Provincias:", formData.provinces.length);
        console.log("   ✅ Listas de precios:", formData.priceLists.length);
        console.log("   ✅ Vendedores:", formData.vendors.length);
    } catch (error) {
        console.error("   ❌ Error obteniendo datos del formulario:", error.message);
        return false;
    }

    console.log("✅ Diagnóstico completado exitosamente");
    return true;
};

// Ejecutar diagnóstico automáticamente en desarrollo
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    setTimeout(() => {
        diagnosticGraphQL();
    }, 2000);
}
