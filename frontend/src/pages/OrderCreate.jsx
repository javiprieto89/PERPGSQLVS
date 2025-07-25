// src/pages/OrderCreate.jsx
import React, { useEffect, useState } from "react";
import {
    clientOperations,
    carOperations,
    serviceTypeOperations,
    saleConditionOperations,
    discountOperations,
    sysOrderStatusOperations,
    pricelistOperations,
    pricelistItemOperations,
    companyOperations,
    branchOperations,
    warehouseOperations,
    orderOperations,
    tempOrderOperations,
    itemOperations,
} from "../utils/graphqlClient";
import ItemSearchModal from "../components/ItemSearchModal";
import ClientSearchModal from "../components/ClientSearchModal";
import SaleConditionSearchModal from "../components/SaleConditionSearchModal";
import ItemConfirmationModal from "../components/ItemConfirmationModal";

export default function OrderCreate({ onClose, onSave, order: initialOrder = null, userInfo, windowRef }) {
    const [formData, setFormData] = useState({
        companyId: userInfo?.companyId || "1",
        branchId: userInfo?.branchId || "1",
        date: new Date().toISOString().slice(0, 10),
        clientId: "",
        carId: "",
        isService: false,
        serviceTypeId: "",
        mileage: "",
        nextServiceMileage: "",
        notes: "",
        saleConditionId: "",
        discountId: "",
        subtotal: 0,
        total: 0,
        vat: 0,
        userId: userInfo?.userId || "1",
        documentID: "",
        orderStatusId: "",
        priceListId: "",
        warehouseId: "",
    });
    const [isEdit, setIsEdit] = useState(false);

    const [filteredClients, setFilteredClients] = useState([]);
    const [clientSearch, setClientSearch] = useState("");
    const [cars, setCars] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [saleConditions, setSaleConditions] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [priceLists, setPriceLists] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [items, setItems] = useState([]);
    const [sessionId, setSessionId] = useState(null);
    const [showClientDropdown, setShowClientDropdown] = useState(false);
    const [showItemSearchModal, setShowItemSearchModal] = useState(false);
    const [showClientSearchModal, setShowClientSearchModal] = useState(false);
    const [showSaleConditionModal, setShowSaleConditionModal] = useState(false);
    const [showItemConfirmationModal, setShowItemConfirmationModal] = useState(false);
    const [selectedItemForConfirmation, setSelectedItemForConfirmation] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [branches, setBranches] = useState([]);

    useEffect(() => {
        if (initialOrder) {
            setIsEdit(true);
            setFormData({
                companyId: String(initialOrder.CompanyID),
                branchId: String(initialOrder.BranchID),
                date: initialOrder.Date_?.slice(0, 10) || new Date().toISOString().slice(0, 10),
                clientId: String(initialOrder.ClientID || ""),
                carId: initialOrder.CarID ? String(initialOrder.CarID) : "",
                isService: Boolean(initialOrder.IsService),
                serviceTypeId: initialOrder.ServiceTypeID ? String(initialOrder.ServiceTypeID) : "",
                mileage: initialOrder.Mileage ? String(initialOrder.Mileage) : "",
                nextServiceMileage: initialOrder.NextServiceMileage ? String(initialOrder.NextServiceMileage) : "",
                notes: initialOrder.Notes || "",
                saleConditionId: String(initialOrder.SaleConditionID || ""),
                discountId: String(initialOrder.DiscountID || ""),
                subtotal: Number(initialOrder.Subtotal || 0),
                total: Number(initialOrder.Total || 0),
                vat: Number(initialOrder.VAT || 0),
                userId: String(initialOrder.UserID || ""),
                documentID: String(initialOrder.DocumentID || ""),
                orderStatusId: String(initialOrder.OrderStatusID || ""),
                priceListId: String(initialOrder.PriceListID || ""),
                warehouseId: String(initialOrder.WarehouseID || "")
            });

            (async () => {
                try {
                    const sid = await tempOrderOperations.loadOrderForEditing(
                        initialOrder.OrderID,
                        userInfo?.userId || initialOrder.UserID,
                        userInfo?.companyId || initialOrder.CompanyID,
                        userInfo?.branchId || initialOrder.BranchID
                    );
                    setSessionId(sid);
                    const tempItems = await tempOrderOperations.getTempItemsByOrder(
                        initialOrder.OrderID
                    );
                    const parsed = await Promise.all(
                        tempItems.map(async (d) => {
                            let code = "";
                            try {
                                const item = await itemOperations.getItemById(d.ItemID);
                                code = item?.Code || "";
                            } catch (e) {
                                console.error("Error obteniendo código de ítem", e);
                            }
                            return {
                                tempId: d.OrderDetailID,
                                itemID: d.ItemID,
                                code,
                                description: d.Description || "",
                                quantity: d.Quantity,
                                price: d.UnitPrice,
                                priceListId: d.PriceListID,
                                warehouseId: d.WarehouseID,
                                subtotal: d.Quantity * d.UnitPrice,
                                orderSessionID: d.OrderSessionID,
                            };
                        })
                    );
                    setItems(parsed);
                } catch (err) {
                    console.error("Error cargando items temporales:", err);
                }
            })();
        }
    }, [initialOrder, userInfo?.userId, userInfo?.companyId, userInfo?.branchId]);

    useEffect(() => {
        const fetchData = async () => {
            const [st, sc, d, os, pl, wh, comp, br] = await Promise.all([
                serviceTypeOperations.getAllServicetypes(),
                saleConditionOperations.getAllSaleConditions(),
                discountOperations.getAllDiscounts(),
                sysOrderStatusOperations.getAllSysorderstatus(),
                pricelistOperations.getAllPricelists(),
                warehouseOperations.getAllWarehouses(),
                companyOperations.getAllCompanies(),
                branchOperations.getAllBranches(),
            ]);
            setServiceTypes(st);
            setSaleConditions(sc);
            setDiscounts(d);
            setStatuses(os);
            setPriceLists(pl);
            setWarehouses(wh);
            setCompanies(comp);
            setBranches(br);
        };
        fetchData();
    }, []);

    const filteredBranches = branches.filter(
        (b) => !formData.companyId || b.CompanyID === parseInt(formData.companyId)
    );

    useEffect(() => {
        if (formData.clientId) {
            carOperations
                .getAllCars()
                .then((all) =>
                    setCars(all.filter((c) => c.ClientID === Number(formData.clientId)))
                );
            clientOperations
                .getClientById(Number(formData.clientId))
                .then((client) => {
                    if (client && client.FirstName) {
                        setClientSearch(`${client.FirstName} ${client.LastName || ""}`);
                        setFilteredClients([]);
                        setShowClientDropdown(false);
                    } else {
                        setClientSearch("");
                    }
                })
                .catch(() => {
                    setClientSearch("");
                });
        } else {
            setClientSearch("");
            setCars([]);
            setFilteredClients([]);
            setShowClientDropdown(false);
        }
    }, [formData.clientId]);

    useEffect(() => {
        if (clientSearch.trim() === "") {
            setFilteredClients([]);
            setShowClientDropdown(false);
            return;
        }
        const handler = setTimeout(async () => {
            try {
                const clients = await clientOperations.getAllClients();
                const term = clientSearch.toLowerCase();
                const filtered = clients.filter((c) =>
                    `${c.FirstName} ${c.LastName || ""}`.toLowerCase().includes(term)
                );
                setFilteredClients(filtered);
                setShowClientDropdown(true);
            } catch {
                setFilteredClients([]);
                setShowClientDropdown(false);
            }
        }, 300);
        return () => clearTimeout(handler);
    }, [clientSearch]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let processed = type === "checkbox" ? checked : value;
        if (name.toLowerCase().includes("id") || name === "mileage" || name === "nextServiceMileage") {
            processed = value === "" ? "" : parseInt(value);
        } else if (["subtotal", "total", "vat"].includes(name)) {
            processed = value === "" ? "" : parseFloat(value);
        }
        setFormData((prev) => ({
            ...prev,
            [name]: processed,
        }));
        if (name === "companyId") {
            setFormData((prev) => ({ ...prev, branchId: "" }));
        }
    };

    const handleItemSelectedFromSearch = async (selectedItem) => {
        let price = selectedItem.price || 0;
        if (formData.priceListId) {
            try {
                const data = await pricelistItemOperations.getFiltered(
                    formData.priceListId,
                    selectedItem.itemID
                );
                if (data.length > 0) {
                    price = data[0].Price;
                }
            } catch (err) {
                console.error("Error fetching price from list", err);
            }
        }
        setSelectedItemForConfirmation({
            ...selectedItem,
            price,
            priceListId: formData.priceListId,
            warehouseId: formData.warehouseId,
        });
        setShowItemSearchModal(false);
        setShowItemConfirmationModal(true);
        setEditIndex(null);
    };

    const handleItemConfirmed = async (itemWithDetails) => {
        console.log("Item confirmado:", itemWithDetails);

        const baseData = {
            Quantity: parseInt(itemWithDetails.quantity),
            UnitPrice: parseFloat(itemWithDetails.price),
            Description: itemWithDetails.description || "",
            WarehouseID: itemWithDetails.warehouseId
                ? parseInt(itemWithDetails.warehouseId)
                : parseInt(formData.warehouseId),
            PriceListID: itemWithDetails.priceListId
                ? parseInt(itemWithDetails.priceListId)
                : parseInt(formData.priceListId),
        };

        if (editIndex !== null) {
            const existing = items[editIndex];
            const updatedItems = [...items];
            updatedItems[editIndex] = {
                ...existing,
                quantity: itemWithDetails.quantity,
                price: itemWithDetails.price,
                priceListId: baseData.PriceListID,
                warehouseId: baseData.WarehouseID,
                subtotal: itemWithDetails.quantity * itemWithDetails.price,
            };
            setItems(updatedItems);

            if (existing.orderSessionID) {
                try {
                    await tempOrderOperations.updateTempItem(
                        existing.orderSessionID,
                        existing.itemID,
                        baseData
                    );
                } catch (error) {
                    console.error("Error actualizando item temporal:", error);
                }
            }
        } else {
            const tempData = {
                CompanyID: parseInt(formData.companyId),
                BranchID: parseInt(formData.branchId),
                UserID: parseInt(formData.userId),
                ItemID: parseInt(itemWithDetails.itemID),
                WarehouseID: baseData.WarehouseID,
                PriceListID: baseData.PriceListID,
                Quantity: baseData.Quantity,
                UnitPrice: baseData.UnitPrice,
                Description: baseData.Description,
            };
            if (sessionId) {
                tempData.OrderSessionID = sessionId;
            }

            try {
                const tempItem = await tempOrderOperations.createTempItem(tempData);
                setSessionId(tempItem.OrderSessionID);
                const newItem = {
                    tempId: Date.now() + Math.random(),
                    itemID: itemWithDetails.itemID,
                    code: itemWithDetails.code,
                    description: itemWithDetails.description,
                    quantity: itemWithDetails.quantity,
                    price: itemWithDetails.price,
                    priceListId: baseData.PriceListID,
                    warehouseId: baseData.WarehouseID,
                    subtotal: itemWithDetails.quantity * itemWithDetails.price,
                    orderSessionID: tempItem.OrderSessionID,
                };
                setItems((prev) => [...prev, newItem]);
            } catch (error) {
                alert("Error guardando item temporal: " + error.message);
            }
        }

        setShowItemConfirmationModal(false);
        setSelectedItemForConfirmation(null);
        setEditIndex(null);
    };

    const handleRemoveItem = async (index) => {
        const item = items[index];
        setItems((prev) => prev.filter((_, i) => i !== index));
        if (item?.orderSessionID) {
            try {
                await tempOrderOperations.deleteTempItem(
                    item.orderSessionID,
                    item.itemID
                );
            } catch (err) {
                console.error("Error eliminando item temporal:", err);
            }
        }
    };

    const handleEditItem = (index) => {
        const item = items[index];
        setSelectedItemForConfirmation({
            itemID: item.itemID,
            code: item.code,
            description: item.description,
            quantity: item.quantity,
            price: item.price,
            priceListId: item.priceListId || formData.priceListId,
            warehouseId: item.warehouseId || formData.warehouseId,
        });
        setEditIndex(index);
        setShowItemConfirmationModal(true);
    };

    const handleCancel = async () => {
        try {
            if (sessionId) {
                await tempOrderOperations.clearTempSession(sessionId);
            }
        } catch (err) {
            console.error("Error limpiando items temporales:", err);
        } finally {
            onClose && onClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!formData.companyId && !userInfo?.companyId) {
            alert("Company ID es requerido");
            return;
        }

        if (!formData.branchId && !userInfo?.branchId) {
            alert("Branch ID es requerido");
            return;
        }

        if (!formData.clientId) {
            alert("Debe seleccionar un cliente");
            return;
        }

        if (!formData.saleConditionId) {
            alert("Debe seleccionar una condición de venta");
            return;
        }

        if (!formData.discountId) {
            alert("Debe seleccionar un descuento");
            return;
        }

        if (!formData.orderStatusId) {
            alert("Debe seleccionar un estado de orden");
            return;
        }

        if (!formData.priceListId) {
            alert("Debe seleccionar una lista de precios");
            return;
        }

        if (!formData.warehouseId) {
            alert("Debe seleccionar un depósito");
            return;
        }

        if (items.length === 0) {
            alert("Debe agregar al menos un ítem al pedido");
            return;
        }

        // Usar userInfo como fallback para campos requeridos
        const finalFormData = {
            ...formData,
            companyId: formData.companyId || userInfo?.companyId,
            branchId: formData.branchId || userInfo?.branchId,
            userId: formData.userId || userInfo?.userId,
        };

        // Preparar datos usando el helper corregido
        const orderData = {
            CompanyID: parseInt(finalFormData.companyId),
            BranchID: parseInt(finalFormData.branchId),
            Date_: new Date(finalFormData.date),
            ClientID: parseInt(finalFormData.clientId),
            CarID: finalFormData.carId ? parseInt(finalFormData.carId) : null,
            IsService: Boolean(finalFormData.isService),
            ServiceTypeID: finalFormData.serviceTypeId ? parseInt(finalFormData.serviceTypeId) : null,
            Mileage: finalFormData.mileage ? parseInt(finalFormData.mileage) : null,
            NextServiceMileage: finalFormData.nextServiceMileage ? parseInt(finalFormData.nextServiceMileage) : null,
            Notes: finalFormData.notes || null,
            SaleConditionID: parseInt(finalFormData.saleConditionId),
            DiscountID: parseInt(finalFormData.discountId),
            Subtotal: parseFloat(finalFormData.subtotal),
            Total: parseFloat(finalFormData.total),
            VAT: parseFloat(finalFormData.vat),
            UserID: parseInt(finalFormData.userId),
            DocumentID: finalFormData.documentID ? parseInt(finalFormData.documentID) : 1,
            OrderStatusID: parseInt(finalFormData.orderStatusId),
            PriceListID: parseInt(finalFormData.priceListId),
            WarehouseID: parseInt(finalFormData.warehouseId),
            Items: items.map((item) => ({
                ItemID: parseInt(item.itemID),
                WarehouseID: parseInt(item.warehouseId || finalFormData.warehouseId),
                Quantity: parseInt(item.quantity),
                UnitPrice: parseFloat(item.price),
                Description: item.description || null,
            }))
        };

        console.log("Enviando orden:", orderData);

        try {
            let response;
            if (isEdit && initialOrder?.OrderID) {
                response = await orderOperations.updateOrder(initialOrder.OrderID, orderData);
            } else {
                response = await orderOperations.createOrder(orderData);
            }
            const order = response.order || response; // compatibilidad
            alert("Orden guardada correctamente. ID: " + order.OrderID);

            // Limpiar formulario después de crear exitosamente
            setFormData({
                companyId: userInfo?.companyId || "1",
                branchId: userInfo?.branchId || "1",
                date: new Date().toISOString().slice(0, 10),
                clientId: "",
                carId: "",
                isService: false,
                serviceTypeId: "",
                mileage: "",
                nextServiceMileage: "",
                notes: "",
                saleConditionId: "",
                discountId: "",
                subtotal: 0,
                total: 0,
                vat: 0,
                userId: userInfo?.userId || "1",
                documentID: "",
                orderStatusId: "",
                priceListId: "",
                warehouseId: "",
            });
            setItems([]);
            setClientSearch("");
            onSave && onSave(response);
            onClose && onClose();
        } catch (error) {
            console.error("Error al crear la orden:", error);
            alert("Error al crear la orden: " + error.message);
        }
    };

    const handleClientSearchChange = (e) => {
        const value = e.target.value;
        setClientSearch(value);
        if (value.trim() === "") {
            setFormData((prev) => ({ ...prev, clientId: "" }));
        }
    };

    const handleClientSelection = (client) => {
        setFormData((prev) => ({ ...prev, clientId: client.ClientID }));
        setClientSearch(`${client.FirstName} ${client.LastName || ""}`);
        setFilteredClients([]);
        setShowClientDropdown(false);
    };

    // Calculate totals
    useEffect(() => {
        const sub = items.reduce((acc, item) => acc + item.subtotal, 0);
        const vatAmount = sub * 0.21;
        setFormData((prev) => ({
            ...prev,
            subtotal: sub,
            vat: vatAmount,
            total: sub + vatAmount,
        }));
    }, [items]);

    useEffect(() => {
        const cleanup = () => {
            if (sessionId) {
                tempOrderOperations
                    .clearTempSession(sessionId, true)
                    .catch((err) => {
                        console.error("Error limpiando items temporales:", err);
                    });
            }
        };
        const win = windowRef || window;
        win.addEventListener("beforeunload", cleanup);
        return () => {
            win.removeEventListener("beforeunload", cleanup);
            cleanup();
        };
    }, [sessionId, windowRef]);

    return (
        <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-8 max-w-5xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-4 mb-8">
                    {isEdit ? 'Editar Pedido' : 'Cargar Nuevo Pedido'}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Sección Datos Generales */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-medium text-indigo-700 mb-6">
                            <span className="border-b-2 border-indigo-200 pb-1">
                                Datos Generales
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
                                    Fecha del Pedido
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                />
                            </div>
                            <div>
                                <label htmlFor="companyId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Compañía
                                </label>
                                <select
                                    name="companyId"
                                    id="companyId"
                                    value={formData.companyId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                    required
                                >
                                    <option value="">Seleccione</option>
                                    {companies.map(c => (
                                        <option key={c.CompanyID} value={c.CompanyID}>{c.Name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="branchId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Sucursal
                                </label>
                                <select
                                    name="branchId"
                                    id="branchId"
                                    value={formData.branchId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                    required
                                >
                                    <option value="">Seleccione</option>
                                    {filteredBranches.map(b => (
                                        <option key={b.BranchID} value={b.BranchID}>{b.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Sección Cliente */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-medium text-indigo-700 mb-6">
                            <span className="border-b-2 border-indigo-200 pb-1">Cliente</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-end">
                            <div className="md:col-span-1">
                                <label htmlFor="clientId" className="block text-sm font-medium text-gray-600 mb-1">
                                    ID Cliente *
                                </label>
                                <input
                                    type="number"
                                    name="clientId"
                                    id="clientId"
                                    value={formData.clientId}
                                    onChange={handleChange}
                                    placeholder="ID Numérico"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="md:col-span-2 relative">
                                <label htmlFor="clientSearch" className="block text-sm font-medium text-gray-600 mb-1">
                                    Buscar Cliente por Nombre
                                </label>
                                <input
                                    type="text"
                                    id="clientSearch"
                                    value={clientSearch}
                                    onChange={handleClientSearchChange}
                                    onBlur={() => {
                                        setTimeout(() => {
                                            const activeElement = document.activeElement;
                                            const dropdownElement = document.getElementById("client-dropdown-list");
                                            if (dropdownElement && dropdownElement.contains(activeElement)) return;
                                            setShowClientDropdown(false);
                                        }, 200);
                                    }}
                                    onFocus={() => {
                                        if (clientSearch.trim() !== "") setShowClientDropdown(true);
                                    }}
                                    placeholder="Escriba para buscar..."
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                    autoComplete="off"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowClientSearchModal(true)}
                                    className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                                {showClientDropdown && (
                                    <ul id="client-dropdown-list" className="absolute z-30 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {filteredClients.length > 0
                                            ? filteredClients.map((c) => (
                                                <li
                                                    key={c.ClientID}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        handleClientSelection(c);
                                                    }}
                                                    className="text-gray-800 cursor-pointer select-none relative py-2 pl-4 pr-4 hover:bg-indigo-500 hover:text-white rounded-md mx-1 my-0.5"
                                                >
                                                    ({c.ClientID}) - {c.FirstName} {c.LastName || ""}
                                                </li>
                                            ))
                                            : clientSearch.trim() !== "" && (
                                                <li className="text-gray-500 cursor-default select-none relative py-2 px-4">
                                                    No se encontraron clientes.
                                                </li>
                                            )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Sección Servicio */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <div className="flex items-center mb-6">
                            <input
                                id="isService"
                                name="isService"
                                type="checkbox"
                                checked={formData.isService}
                                onChange={handleChange}
                                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-offset-0"
                            />
                            <label htmlFor="isService" className="ml-3 block text-sm font-medium text-gray-700">
                                Marcar si es un Pedido de Servicio
                            </label>
                        </div>

                        {formData.isService && (
                            <div className="space-y-6 pt-4 border-t border-gray-200">
                                <h3 className="text-lg font-medium text-indigo-600 mb-4">Detalles del Servicio</h3>
                                <div>
                                    <label htmlFor="carId" className="block text-sm font-medium text-gray-600 mb-1">
                                        Vehículo del Cliente
                                    </label>
                                    <select
                                        name="carId"
                                        id="carId"
                                        value={formData.carId}
                                        onChange={handleChange}
                                        disabled={!formData.clientId || cars.length === 0}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100 disabled:text-gray-400"
                                    >
                                        <option value="">
                                            {formData.clientId
                                                ? cars.length > 0
                                                    ? "Seleccionar vehículo..."
                                                    : "Cliente sin vehículos registrados"
                                                : "Seleccionar un cliente primero..."}
                                        </option>
                                        {cars.map((car) => (
                                            <option key={car.CarID} value={car.CarID}>
                                                {car.CarBrandName} {car.CarModelName} ({car.LicensePlate})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="serviceTypeId" className="block text-sm font-medium text-gray-600 mb-1">
                                        Tipo de Servicio
                                    </label>
                                    <select
                                        name="serviceTypeId"
                                        id="serviceTypeId"
                                        value={formData.serviceTypeId}
                                        onChange={handleChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="">Seleccionar tipo de servicio...</option>
                                        {serviceTypes.map((st) => (
                                            <option key={st.ServiceTypeID} value={st.ServiceTypeID}>
                                                {st.Type}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <label htmlFor="mileage" className="block text-sm font-medium text-gray-600 mb-1">
                                            Kilometraje Actual
                                        </label>
                                        <input
                                            type="number"
                                            name="mileage"
                                            id="mileage"
                                            value={formData.mileage}
                                            onChange={handleChange}
                                            placeholder="Ej: 120000"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="nextServiceMileage" className="block text-sm font-medium text-gray-600 mb-1">
                                            Próximo Servicio (Km)
                                        </label>
                                        <input
                                            type="number"
                                            name="nextServiceMileage"
                                            id="nextServiceMileage"
                                            value={formData.nextServiceMileage}
                                            onChange={handleChange}
                                            placeholder="Ej: 130000"
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Sección Condiciones Comerciales */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-medium text-indigo-700 mb-6">
                            <span className="border-b-2 border-indigo-200 pb-1">
                                Notas y Condiciones Comerciales
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="md:col-span-2">
                                <label htmlFor="notes" className="block text-sm font-medium text-gray-600 mb-1">
                                    Notas Adicionales
                                </label>
                                <textarea
                                    name="notes"
                                    id="notes"
                                    rows="4"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                                    placeholder="Observaciones sobre el pedido o servicio..."
                                ></textarea>
                            </div>
                            <div className="relative">
                                <label htmlFor="saleConditionId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Condición de Venta *
                                </label>
                                <select
                                    name="saleConditionId"
                                    id="saleConditionId"
                                    value={formData.saleConditionId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar condición...</option>
                                    {saleConditions.map((sc) => (
                                        <option key={sc.SaleConditionID} value={sc.SaleConditionID}>
                                            {sc.Name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="button"
                                    onClick={() => setShowSaleConditionModal(true)}
                                    className="absolute right-2 top-9 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <label htmlFor="discountId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Descuento Aplicado *
                                </label>
                                <select
                                    name="discountId"
                                    id="discountId"
                                    value={formData.discountId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar descuento...</option>
                                    {discounts.map((d) => (
                                        <option key={d.DiscountID} value={d.DiscountID}>
                                            {d.DiscountName} - {d.Percentage}%
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="priceListId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Lista de Precios *
                                </label>
                                <select
                                    name="priceListId"
                                    id="priceListId"
                                    value={formData.priceListId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar lista de precios...</option>
                                    {priceLists.map((pl) => (
                                        <option key={pl.PriceListID} value={pl.PriceListID}>
                                            {pl.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="orderStatusId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Estado del Pedido *
                                </label>
                                <select
                                    name="orderStatusId"
                                    id="orderStatusId"
                                    value={formData.orderStatusId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar estado...</option>
                                    {statuses.map((s) => (
                                        <option key={s.OrderStatusID} value={s.OrderStatusID}>
                                            {s.Status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="warehouseId" className="block text-sm font-medium text-gray-600 mb-1">
                                    Depósito *
                                </label>
                                <select
                                    name="warehouseId"
                                    id="warehouseId"
                                    value={formData.warehouseId}
                                    onChange={handleChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="">Seleccionar depósito...</option>
                                    {warehouses.map((w) => (
                                        <option key={w.WarehouseID} value={w.WarehouseID}>
                                            {w.Name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Sección Ítems del Pedido */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-medium text-indigo-700">
                                <span className="border-b-2 border-indigo-200 pb-1">
                                    Ítems del Pedido
                                </span>
                            </h2>
                            <button
                                type="button"
                                onClick={() => setShowItemSearchModal(true)}
                                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Buscar Ítem Avanzado
                            </button>
                        </div>

                        {/* DataGrid de ítems */}
                        {items.length > 0 && (
                            <div className="flow-root mt-6">
                                <div className="overflow-x-auto border border-gray-200 rounded-md">
                                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                                                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {items.map((item, index) => (
                                                <tr key={item.tempId ?? `${item.itemID}-${index}`} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{item.code || "N/A"}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate">{item.description}</td>
                                                    <td className="px-4 py-3 text-right text-sm text-gray-700">{item.quantity}</td>
                                                    <td className="px-4 py-3 text-right text-sm text-gray-700">${parseFloat(item.price).toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-right text-sm text-gray-700 font-medium">${item.subtotal.toFixed(2)}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <div className="flex space-x-2 justify-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditItem(index)}
                                                                className="text-indigo-600 hover:text-indigo-800 font-medium"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveItem(index)}
                                                                className="text-red-600 hover:text-red-800 font-medium"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {items.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <p className="text-lg">No hay ítems agregados al pedido</p>
                                <p className="text-sm">Use el botón "Buscar Ítem Avanzado" para agregar productos</p>
                            </div>
                        )}
                    </section>

                    {/* Sección Totales y Guardar */}
                    <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-medium text-indigo-700 mb-6">
                            <span className="border-b-2 border-indigo-200 pb-1">
                                Resumen y Guardar
                            </span>
                        </h2>
                        <div className="space-y-3 text-right mb-6 text-gray-700">
                            <p className="text-lg">
                                Subtotal:{" "}
                                <span className="font-semibold">
                                    ${formData.subtotal.toFixed(2)}
                                </span>
                            </p>
                            <p className="text-lg">
                                IVA (21%):{" "}
                                <span className="font-semibold">
                                    ${formData.vat.toFixed(2)}
                                </span>
                            </p>
                            <p className="text-2xl font-bold text-indigo-600">
                                Total:{" "}
                                <span className="font-extrabold">
                                    ${formData.total.toFixed(2)}
                                </span>
                            </p>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4 border-t">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => {}}
                                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                            >
                                Emitir
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                            >
                                {isEdit ? 'Guardar Cambios' : 'Guardar Pedido'}
                            </button>
                        </div>
                    </section>
                </form>
            </div>

            {/* Modales */}
            {showItemSearchModal && (
                <ItemSearchModal
                    isOpen={true}
                    onClose={() => setShowItemSearchModal(false)}
                    onItemSelect={handleItemSelectedFromSearch}
                />
            )}

            {showClientSearchModal && (
                <ClientSearchModal
                    isOpen={true}
                    onClose={() => setShowClientSearchModal(false)}
                    onClientSelect={(c) => {
                        handleClientSelection({
                            ClientID: c.clientID,
                            FirstName: c.firstName,
                            LastName: c.lastName,
                        });
                        setShowClientSearchModal(false);
                    }}
                />
            )}

            {showSaleConditionModal && (
                <SaleConditionSearchModal
                    isOpen={true}
                    onClose={() => setShowSaleConditionModal(false)}
                    onSelect={(sc) => {
                        setFormData((prev) => ({ ...prev, saleConditionId: sc.SaleConditionID }));
                        setShowSaleConditionModal(false);
                    }}
                />
            )}

            {showItemConfirmationModal && selectedItemForConfirmation && (
                <ItemConfirmationModal
                    isOpen={true}
                    item={selectedItemForConfirmation}
                    onClose={() => {
                        setShowItemConfirmationModal(false);
                        setSelectedItemForConfirmation(null);
                        setEditIndex(null);
                    }}
                    onConfirm={handleItemConfirmed}
                    confirmLabel={editIndex !== null ? "Actualizar Ítem" : "Agregar al Pedido"}
                    priceLists={priceLists}
                    warehouses={warehouses}
                    defaultPriceListId={selectedItemForConfirmation.priceListId || formData.priceListId}
                    defaultWarehouseId={selectedItemForConfirmation.warehouseId || formData.warehouseId}
                />
            )}
        </div>
    );

}
