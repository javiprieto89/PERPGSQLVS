// frontend/src/pages/PriceListItems.jsx
import { useEffect, useState } from "react";
import {
  pricelistItemOperations,
  pricelistOperations,
} from "~/services/price-list.service";
import ItemSearchModal from "../components/ItemSearchModal";

export default function PriceListItems({ onClose, onSaved }) {
  const [priceLists, setPriceLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterItem, setFilterItem] = useState(null);
  const [existing, setExisting] = useState([]);

  const loadExisting = async (listId, itemId) => {
    const data = await pricelistItemOperations.getFiltered(
      listId || null,
      itemId || null
    );
    setExisting(data);
  };

  const addItem = (it) => {
    if (items.some((i) => i.ItemID === it.itemID)) return;
    const price = 0;
    setItems((prev) => [
      ...prev,
      {
        ItemID: it.itemID,
        Code: it.code,
        Description: it.description,
        Price: price,
      },
    ]);
    setShowModal(false);
  };

  const updatePrice = (id, value) => {
    setItems((prev) =>
      prev.map((it) => (it.ItemID === id ? { ...it, Price: value } : it))
    );
  };

  const handleSave = async () => {
    if (!selectedList) return;
    for (const it of items) {
      await pricelistItemOperations.createPricelistItem({
        PriceListID: Number(selectedList),
        ItemID: it.ItemID,
        Price: parseFloat(it.Price),
      });
    }
    setItems([]);
    loadExisting(selectedList, filterItem?.ItemID || null);
    window.opener?.postMessage("reload-pricelistitems", "*");
    onSaved && onSaved();
  };

  useEffect(() => {
    pricelistOperations.getAllPricelists().then(setPriceLists);
    loadExisting();
  }, []);

  useEffect(() => {
    loadExisting(selectedList || null, filterItem?.ItemID || null);
  }, [selectedList, filterItem]);

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Asignar precios a ítems</h2>
      <div className="flex gap-2 items-center">
        <select
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Seleccione lista</option>
          {priceLists.map((pl) => (
            <option key={pl.PriceListID} value={pl.PriceListID}>
              {pl.Name}
            </option>
          ))}
        </select>
        <input
          type="text"
          readOnly
          onClick={() => setShowFilterModal(true)}
          value={
            filterItem ? `${filterItem.Code} - ${filterItem.Description}` : ""
          }
          placeholder="Filtrar ítem"
          className="border p-2 rounded w-72 cursor-pointer"
        />
        {filterItem && (
          <button
            onClick={() => setFilterItem(null)}
            className="px-2 border rounded"
          >
            ×
          </button>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Agregar Ítems
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Guardar
        </button>
        <button onClick={onClose} className="px-4 py-2 border rounded">
          Cerrar
        </button>
      </div>
      {items.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 text-left">Código</th>
              <th className="px-2 text-left">Descripción</th>
              <th className="px-2">Precio</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.ItemID}>
                <td className="border px-2">{it.Code}</td>
                <td className="border px-2">{it.Description}</td>
                <td className="border px-2">
                  <input
                    type="number"
                    step="0.01"
                    value={it.Price}
                    onChange={(e) => updatePrice(it.ItemID, e.target.value)}
                    className="w-24 border p-1 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3 className="font-semibold">Existentes</h3>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="px-2 text-left">Lista</th>
            <th className="px-2 text-left">Código</th>
            <th className="px-2 text-left">Descripción</th>
            <th className="px-2">Precio</th>
            <th className="px-2">Última modificación</th>
          </tr>
        </thead>
        <tbody>
          {existing.map((pl) => (
            <tr key={`${pl.PriceListID}-${pl.ItemID}`}>
              <td className="border px-2">{pl.PriceListName}</td>
              <td className="border px-2">{pl.Code}</td>
              <td className="border px-2">{pl.Description}</td>
              <td className="border px-2">{pl.Price}</td>
              <td className="border px-2">{pl.EffectiveDate?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ItemSearchModal
          isOpen={true}
          onClose={() => setShowModal(false)}
          onItemSelect={addItem}
        />
      )}
      {showFilterModal && (
        <ItemSearchModal
          isOpen={true}
          onClose={() => setShowFilterModal(false)}
          onItemSelect={(it) => {
            setFilterItem({
              ItemID: it.itemID,
              Code: it.code,
              Description: it.description,
            });
            setShowFilterModal(false);
          }}
        />
      )}
    </div>
  );
}
