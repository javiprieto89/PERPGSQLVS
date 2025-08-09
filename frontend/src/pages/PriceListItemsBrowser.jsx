// frontend/src/pages/PriceListItemsBrowser.jsx
import { useEffect, useState } from "react";
import {
  pricelistItemOperations,
  pricelistOperations,
} from "~/graphql/operations.js";
import ItemSearchModal from "../components/ItemSearchModal";
import { openReactWindow } from "../utils/openReactWindow";
import PriceListItems from "./PriceListItems";

export default function PriceListItemsBrowser() {
  const [priceLists, setPriceLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    pricelistOperations.getAllPricelists().then(setPriceLists);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.data === "reload-pricelistitems") {
        loadResults();
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [selectedList, selectedItem]);

  const loadResults = async () => {
    if (!selectedList && !selectedItem) {
      setResults([]);
      return;
    }
    const data = await pricelistItemOperations.getFiltered(
      selectedList || null,
      selectedItem?.ItemID || null
    );
    setResults(data);
  };

  const handleSelectItem = (item) => {
    setSelectedItem({
      ItemID: item.itemID,
      Code: item.code,
      Description: item.description,
    });
    setShowModal(false);
  };

  const clearFilters = () => {
    setSelectedList("");
    setSelectedItem(null);
    setResults([]);
  };

  const handleAdd = () => {
    openReactWindow(
      (popup) => <PriceListItems onClose={() => popup.close()} />,
      "Asignar precios a ítems",
      { width: 1000, height: 700 }
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Listas de precios - Items</h1>
      <div className="flex gap-2 items-center">
        <select
          value={selectedList}
          onChange={(e) => setSelectedList(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Todas las listas</option>
          {priceLists.map((pl) => (
            <option key={pl.PriceListID} value={pl.PriceListID}>
              {pl.Name}
            </option>
          ))}
        </select>
        <input
          type="text"
          readOnly
          onClick={() => setShowModal(true)}
          value={
            selectedItem
              ? `${selectedItem.Code} - ${selectedItem.Description}`
              : ""
          }
          placeholder="Buscar ítem"
          className="border p-2 rounded w-72 cursor-pointer"
        />
        <button
          onClick={loadResults}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Filtrar
        </button>
        <button onClick={clearFilters} className="px-4 py-2 border rounded">
          Limpiar
        </button>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Agregar
        </button>
      </div>
      {results.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-2 text-left">Lista</th>
              <th className="px-2 text-left">Código</th>
              <th className="px-2 text-left">Descripción</th>
              <th className="px-2 text-right">Precio</th>
              <th className="px-2">Última modificación</th>
              <th className="px-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((pl) => {
              const isEditing =
                editing &&
                editing.PriceListID === pl.PriceListID &&
                editing.ItemID === pl.ItemID;
              return (
                <tr key={`${pl.PriceListID}-${pl.ItemID}`}>
                  <td className="border px-2">{pl.PriceListName}</td>
                  <td className="border px-2">{pl.Code}</td>
                  <td className="border px-2">{pl.Description}</td>
                  <td className="border px-2 text-right">
                    {isEditing ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-24 border rounded p-1"
                      />
                    ) : (
                      pl.Price
                    )}
                  </td>
                  <td className="border px-2">
                    {pl.EffectiveDate?.slice(0, 10)}
                  </td>
                  <td className="border px-2 text-center">
                    {isEditing ? (
                      <>
                        <button
                          onClick={async () => {
                            await pricelistItemOperations.updatePricelistItem(
                              pl.PriceListID,
                              pl.ItemID,
                              { Price: parseFloat(editPrice) }
                            );
                            setEditing(null);
                            loadResults();
                          }}
                          className="px-2 text-green-600"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditing(null)}
                          className="px-2 text-muted-foreground"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setEditing({
                            PriceListID: pl.PriceListID,
                            ItemID: pl.ItemID,
                          });
                          setEditPrice(pl.Price);
                        }}
                        className="px-2 text-primary"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {showModal && (
        <ItemSearchModal
          isOpen={true}
          onClose={() => setShowModal(false)}
          onItemSelect={handleSelectItem}
        />
      )}
    </div>
  );
}
