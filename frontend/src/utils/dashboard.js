// frontend/src/graphql/dashboard.js
export const dashboardHelpers = {
    processDashboardData(data, companyId = null) {
        const clients = data.clients || [];
        const items = data.items || [];
        const orders = data.orders || [];
        const itemstock = data.itemstock || [];

        // Filtrar por empresa si se especifica
        const filteredItems = companyId
            ? items.filter(item => item.CompanyID === companyId)
            : items;

        const filteredOrders = companyId
            ? orders.filter(order => order.CompanyID === companyId)
            : orders;

        const filteredStock = companyId
            ? itemstock.filter(stock => stock.CompanyID === companyId)
            : itemstock;

        // Calcular fecha del mes actual
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Filtrar órdenes del mes actual - CORREGIDO
        const monthlyOrders = filteredOrders.filter(order => {
            if (!order.Date_) return false; // Corregido: usar Date_ en lugar de Date
            const orderDate = new Date(order.Date_);
            return orderDate.getMonth() === currentMonth &&
                orderDate.getFullYear() === currentYear;
        });

        // Calcular items con stock bajo
        const lowStockItems = filteredStock.filter(stock => {
            const item = filteredItems.find(i => i.ItemID === stock.ItemID);
            return item &&
                item.ControlStock &&
                stock.Quantity <= (stock.MinStockLevel || item.ReplenishmentStock || 0) &&
                stock.Quantity > 0;
        });

        return {
            totalClients: clients.length,
            activeClients: clients.filter(c => c.IsActive).length,
            totalItems: filteredItems.length,
            activeItems: filteredItems.filter(i => i.IsActive).length,
            lowStockItems: lowStockItems.length,
            totalOrders: filteredOrders.length,
            pendingOrders: filteredOrders.filter(o => [1, 2].includes(o.OrderStatusID)).length,
            completedOrders: filteredOrders.filter(o => o.OrderStatusID === 3).length,
            monthlySales: monthlyOrders.reduce((sum, order) => sum + (parseFloat(order.Total) || 0), 0),
            monthlyOrdersCount: monthlyOrders.length
        };
    }
};
