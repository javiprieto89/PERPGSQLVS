// frontend/src/components/ItemConfirmationModal.jsx
import { useEffect, useState } from "react";
import WarehouseSearchModal from "./WarehouseSearchModal";

export default function ItemConfirmationModal({
  isOpen,
  item,
  onClose,
  onConfirm,
  confirmLabel = "Agregar al Pedido",
  priceLists = [],
  warehouses = [],
  defaultPriceListId = "",
  defaultWarehouseId = "",
}) {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [priceListId, setPriceListId] = useState(defaultPriceListId);
  const [warehouseId, setWarehouseId] = useState(defaultWarehouseId);
  const [showWarehouseModal, setShowWarehouseModal] = useState(false);

  useEffect(() => {
    if (item) {
      console.log("ItemConfirmationModal - Item recibido:", item); // Debug log
      setPrice(item.price || 0);
      setQuantity(item.quantity || 1);
    }
  }, [item]);

  useEffect(() => {
    setPriceListId(defaultPriceListId || "");
    setWarehouseId(defaultWarehouseId || "");
  }, [defaultPriceListId, defaultWarehouseId]);

  useEffect(() => {
    setSubtotal(quantity * price);
  }, [quantity, price]);

  const handleConfirm = () => {
    if (quantity <= 0) {
      alert("La cantidad debe ser mayor que 0");
      return;
    }
    if (price < 0) {
      alert("El precio no puede ser negativo");
      return;
    }

    // Validar que el item tenga un ID válido
    if (!item.itemID && item.itemID !== 0) {
      alert("Error: El ítem no tiene un ID válido");
      console.error("Item sin ID válido:", item);
      return;
    }

    const itemWithDetails = {
      itemID: item.itemID,
      code: item.code,
      description: item.description,
      quantity: parseInt(quantity, 10),
      price: parseFloat(price),
      priceListId: priceListId ? parseInt(priceListId) : null,
      warehouseId: warehouseId ? parseInt(warehouseId) : null,
    };

    console.log("ItemConfirmationModal - Item a confirmar:", itemWithDetails); // Debug log

    onConfirm(itemWithDetails);
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handlePriceChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setPrice(value);
  };

  if (!isOpen || !item) return null;

  return (
    <>
      <div className="fixed inset-0  bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
        <div className="relative mx-auto p-6 border w-full max-w-lg shadow-lg rounded-md ">
          <div className="flex justify-between items-center pb-4 border-b">
            <h3 className="text-xl font-semibold text-foreground/80">
              Confirmar Ítem
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover: hover:text-foreground rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Información del ítem */}
            <div className=" p-4 rounded-md">
              <h4 className="font-medium text-foreground mb-2">
                Ítem Seleccionado
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">ID:</span>{" "}
                  {item.itemID || "No disponible"}
                </p>
                <p>
                  <span className="font-medium">Código:</span>{" "}
                  {item.code || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Descripción:</span>{" "}
                  {item.description}
                </p>
                {item.brandName && (
                  <p>
                    <span className="font-medium">Marca:</span> {item.brandName}
                  </p>
                )}
                {item.categoryName && (
                  <p>
                    <span className="font-medium">Categoría:</span>{" "}
                    {item.categoryName}
                  </p>
                )}
              </div>
            </div>

            {/* Formulario de cantidad y precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Precio Unitario
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="priceListId"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Lista de Precios
                </label>
                <select
                  id="priceListId"
                  value={priceListId}
                  onChange={(e) => setPriceListId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar...</option>
                  {priceLists.map((pl) => (
                    <option key={pl.PriceListID} value={pl.PriceListID}>
                      {pl.Name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="warehouseId"
                  className="block text-sm font-medium text-foreground/80 mb-1"
                >
                  Depósito
                </label>
                <div className="flex space-x-2 items-center">
                  <select
                    id="warehouseId"
                    value={warehouseId}
                    onChange={(e) => setWarehouseId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Seleccionar...</option>
                    {warehouses.map((w) => (
                      <option key={w.WarehouseID} value={w.WarehouseID}>
                        {w.Name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowWarehouseModal(true)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
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
              </div>
            </div>

            {/* Subtotal */}
            <div className="bg-indigo-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-foreground/80">
                  Subtotal:
                </span>
                <span className="text-xl font-bold text-indigo-600">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-foreground/80  border  rounded-md hover: focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showWarehouseModal && (
        <WarehouseSearchModal
          isOpen={true}
          onClose={() => setShowWarehouseModal(false)}
          onSelect={(w) => {
            setWarehouseId(w.WarehouseID.toString());
            setShowWarehouseModal(false);
          }}
        />
      )}
    </>
  );
}
