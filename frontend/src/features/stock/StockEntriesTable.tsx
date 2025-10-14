// frontend/src/features/stock/StockEntriesTable.tsx

import type { TempStockEntry, Warehouse } from "./stockTypes";

interface StockEntriesTableProps {
  entries: TempStockEntry[];
  warehouses: Omit<Warehouse, "CompanyID">[];
}

export function StockEntriesTable({ entries, warehouses }: StockEntriesTableProps) {
  if (entries.length === 0) {
    return null;
  }

  const getWarehouseName = (warehouseId: number): string => {
    const warehouse = warehouses.find((w) => w.WarehouseID === warehouseId);
    return warehouse?.WarehouseName || String(warehouseId);
  };

  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="px-2">Ítem</th>
          <th className="px-2">Depósito</th>
          <th className="px-2">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.TempStockEntryID} className="border-t">
            <td className="px-2">{entry.ItemID}</td>
            <td className="px-2">{getWarehouseName(entry.WarehouseID)}</td>
            <td className="px-2">{entry.Quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
