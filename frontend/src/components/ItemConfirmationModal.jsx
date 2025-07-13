// frontend/src/components/ItemConfirmationModal.jsx
import React, { useState, useEffect } from "react";

export default function ItemConfirmationModal({
    isOpen,
    item,
    onClose,
    onConfirm,
    priceLists = [],
    warehouses = [],
    defaultPriceListId = "",
    defaultWarehouseId = "",
    confirmLabel = "Agregar al Pedido",
}) {
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [priceListId, setPriceListId] = useState(defaultPriceListId);
    const [warehouseId, setWarehouseId] = useState(defaultWarehouseId);

    useEffect(() => {
        if (item) {
            console.log("ItemConfirmationModal - Item recibido:", item); // Debug log
            setPrice(item.price || 0);
            setQuantity(item.quantity || 1);
            setPriceListId(defaultPriceListId || "");
            setWarehouseId(defaultWarehouseId || "");
        }
    }, [item, defaultPriceListId, defaultWarehouseId]);

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
            priceListId: priceListId,
            warehouseId: warehouseId,
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
            <div className="relative mx-auto p-6 border w-full max-w-lg shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center pb-4 border-b">
                    <h3 className="text-xl font-semibold text-gray-700">
                        Confirmar Ítem
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-800 mb-2">
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
                                    <span className="font-medium">Marca:</span>{" "}
                                    {item.brandName}
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
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Cantidad
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    <div>
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 mb-1"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="priceList" className="block text-sm font-medium text-gray-700 mb-1">
                            Lista de Precios
                        </label>
                        <select
                            id="priceList"
                            value={priceListId}
                            onChange={(e) => setPriceListId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                        <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-1">
                            Depósito
                        </label>
                        <select
                            id="warehouse"
                            value={warehouseId}
                            onChange={(e) => setWarehouseId(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">Seleccionar...</option>
                            {warehouses.map((w) => (
                                <option key={w.WarehouseID} value={w.WarehouseID}>
                                    {w.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                    {/* Subtotal */}
                    <div className="bg-indigo-50 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-700">
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
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
    );
}