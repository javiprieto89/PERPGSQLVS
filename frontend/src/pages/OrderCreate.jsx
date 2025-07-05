// src/pages/OrderCreate.jsx
import React, { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";
import ItemSearchModal from "../components/ItemSearchModal"; // Importar el modal
import MyWindowPortal from "../components/MyWindowPortal"; // Importar el portal

export default function OrderCreate({ userInfo }) {
  const [formData, setFormData] = useState({
    companyId: userInfo?.companyId || "",
    branchId: userInfo?.branchId || "",
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
    userId: userInfo?.userId || "",
    documentID: "",
    statusId: "",
    priceListId: "",
  });

  const [filteredClients, setFilteredClients] = useState([]);
  const [clientSearch, setClientSearch] = useState("");
  const [cars, setCars] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [saleConditions, setSaleConditions] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    code: "",
    description: "",
    quantity: 1,
    price: 0,
  });
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showItemSearchModal, setShowItemSearchModal] = useState(false); // Estado para el modal de búsqueda de ítems

  useEffect(() => {
    const fetchData = async () => {
      const [st, sc, d, os, pl] = await Promise.all([
        apiFetch("/servicetype/"),
        apiFetch("/saleconditions/"),
        apiFetch("/discounts/"),
        apiFetch("/orderstatus/"),
        apiFetch("/pricelists/"),
      ]);
      setServiceTypes(st || []);
      setSaleConditions(sc || []);
      setDiscounts(d || []);
      setStatuses(os || []);
      setPriceLists(pl || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.clientId) {
      apiFetch(`/cars/byclient/${formData.clientId}/`).then(setCars); // Added trailing slash
      apiFetch(`/clients/${formData.clientId}/`) // Added trailing slash
        .then((client) => {
          if (client && client.firstName) {
            setClientSearch(`${client.firstName} ${client.lastName || ""}`);
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
    const handler = setTimeout(() => {
      apiFetch(`/clients/search/?name=${encodeURIComponent(clientSearch)}`) // Added trailing slash to base path
        .then((data) => {
          setFilteredClients(data || []);
          setShowClientDropdown(true);
        })
        .catch(() => {
          setFilteredClients([]);
          setShowClientDropdown(false);
        });
    }, 300);
    return () => clearTimeout(handler);
  }, [clientSearch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = async () => {
    if (
      parseFloat(currentItem.price) < 0 ||
      parseInt(currentItem.quantity) <= 0
    ) {
      alert("El precio y la cantidad deben ser valores válidos.");
      return;
    }
    if (!currentItem.code && !currentItem.description) {
      alert("Debe ingresar un código o descripción para el ítem.");
      return;
    }

    // Enviar al backend
    try {
      const response = await apiFetch("/temporderdetails/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentItem,
          orderId: formData.orderId, // Asegúrate de tener este dato
        }),
      });

      // Actualizar el estado local con la respuesta del backend
      setItems((prev) => [...prev, response]);
      setCurrentItem({ code: "", description: "", quantity: 1, price: 0 });
    } catch (error) {
      console.error("Error al agregar el ítem:", error);
      alert("Error al agregar el ítem: " + error.message);
    }
  };
  const handleSelectItemFromModal = (selectedItem) => {
    setCurrentItem((prev) => ({
      ...prev, // Mantener cantidad si ya la había puesto, o resetearla
      code: selectedItem.code || "",
      description: selectedItem.description || "",
      price: selectedItem.price || 0, // El precio vendrá del ítem seleccionado
      // Aquí podrías querer resetear la cantidad a 1 o mantener la que estaba
      // quantity: 1,
    }));
    // Opcionalmente, enfocar el campo de cantidad o precio después de seleccionar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Add calculation for subtotal, total, vat before submitting
    const orderData = { ...formData, items };
    console.log("Enviando orden:", orderData);
    try {
      const response = await apiFetch("/orders/", {
        // Added trailing slash
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      alert("Orden creada correctamente. ID: " + response.orderID); // Assuming response contains orderID
      // Reset form or redirect
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
    setFormData((prev) => ({ ...prev, clientId: client.clientID }));
    setClientSearch(`${client.firstName} ${client.lastName || ""}`);
    setFilteredClients([]);
    setShowClientDropdown(false);
  };

  // Calculate totals - this should be refined
  useEffect(() => {
    const sub = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    // Assuming VAT is 21% for example
    const vatAmount = sub * 0.21;
    setFormData((prev) => ({
      ...prev,
      subtotal: sub,
      vat: vatAmount,
      total: sub + vatAmount,
    }));
  }, [items]);

  return (
    <div className="container mx-auto p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 border-b-2 border-gray-200 pb-4 mb-8">
          Cargar Nuevo Pedido
        </h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-medium text-indigo-700 mb-6">
              <span className="border-b-2 border-indigo-200 pb-1">
                Datos Generales
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
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
            </div>
          </section>

          <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-medium text-indigo-700 mb-6">
              <span className="border-b-2 border-indigo-200 pb-1">Cliente</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6 items-end">
              <div className="md:col-span-1">
                <label
                  htmlFor="clientId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  ID Cliente
                </label>
                <input
                  type="number"
                  name="clientId"
                  id="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  placeholder="ID Numérico"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3"
                />
              </div>
              <div className="md:col-span-2 relative">
                <label
                  htmlFor="clientSearch"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
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
                      const dropdownElement = document.getElementById(
                        "client-dropdown-list"
                      );
                      if (
                        dropdownElement &&
                        dropdownElement.contains(activeElement)
                      )
                        return;
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
                {showClientDropdown && (
                  <ul
                    id="client-dropdown-list"
                    className="absolute z-30 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {filteredClients.length > 0
                      ? filteredClients.map((c) => (
                          <li
                            key={c.clientID}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleClientSelection(c);
                            }}
                            className="text-gray-800 cursor-pointer select-none relative py-2 pl-4 pr-4 hover:bg-indigo-500 hover:text-white rounded-md mx-1 my-0.5"
                          >
                            ({c.clientID}) - {c.firstName} {c.lastName || ""}
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
              <label
                htmlFor="isService"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Marcar si es un Pedido de Servicio
              </label>
            </div>

            {formData.isService && (
              <div className="space-y-6 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-indigo-600 mb-4">
                  Detalles del Servicio
                </h3>
                <div>
                  <label
                    htmlFor="carId"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
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
                      <option key={car.carID} value={car.carID}>
                        {car.CarBrandName} {car.CarModelName} (
                        {car.licensePlate})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="serviceTypeId"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
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
                      <option key={st.serviceTypeID} value={st.serviceTypeID}>
                        {st.Type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label
                      htmlFor="mileage"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
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
                    <label
                      htmlFor="nextServiceMileage"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
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

          <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-medium text-indigo-700 mb-6">
              <span className="border-b-2 border-indigo-200 pb-1">
                Notas y Condiciones Comerciales
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
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
              <div>
                <label
                  htmlFor="saleConditionId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Condición de Venta
                </label>
                <select
                  name="saleConditionId"
                  id="saleConditionId"
                  value={formData.saleConditionId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccionar condición...</option>
                  {saleConditions.map((sc) => (
                    <option key={sc.saleConditionID} value={sc.saleConditionID}>
                      {sc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="discountId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Descuento Aplicado
                </label>
                <select
                  name="discountId"
                  id="discountId"
                  value={formData.discountId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccionar descuento...</option>
                  {discounts.map((d) => (
                    <option key={d.discountID} value={d.discountID}>
                      {d.discountName} - {d.percentage}%
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="priceListId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Lista de Precios
                </label>
                <select
                  name="priceListId"
                  id="priceListId"
                  value={formData.priceListId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccionar lista de precios...</option>
                  {priceLists.map((pl) => (
                    <option key={pl.priceListID} value={pl.priceListID}>
                      {pl.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="statusId"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Estado del Pedido
                </label>
                <select
                  name="statusId"
                  id="statusId"
                  value={formData.statusId}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-200 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Seleccionar estado...</option>
                  {statuses.map((s) => (
                    <option key={s.orderStatusID} value={s.orderStatusID}>
                      {s.status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="p-6 border border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-medium text-indigo-700 mb-6">
              <span className="border-b-2 border-indigo-200 pb-1">
                Ítems del Pedido
              </span>
            </h2>
            <div className="flex justify-between items-center mb-4">
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
            <div className="grid grid-cols-12 gap-x-6 gap-y-4 items-end p-4 border border-gray-200 rounded-md mb-6 bg-gray-50/30">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="itemCode"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Código
                </label>
                <input
                  type="text"
                  name="code"
                  id="itemCode"
                  value={currentItem.code}
                  onChange={handleItemChange}
                  placeholder="Código Manual"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="itemdescription"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Descripción
                </label>
                <input
                  type="text"
                  name="description"
                  id="itemdescription"
                  value={currentItem.description}
                  onChange={handleItemChange}
                  placeholder="Descripción"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 sm:text-sm"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="itemQuantity"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="itemQuantity"
                  value={currentItem.quantity}
                  onChange={handleItemChange}
                  min="1"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 sm:text-sm"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="itemPrice"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Precio Unit.
                </label>
                <input
                  type="number"
                  name="price"
                  id="itemPrice"
                  value={currentItem.price}
                  onChange={handleItemChange}
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-3 sm:text-sm"
                />
              </div>
              <div className="col-span-4 sm:col-span-1 flex items-end">
                <button
                  type="button"
                  onClick={addItem}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 border border-transparent rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Añadir
                </button>
              </div>
            </div>

            {items.length > 0 && (
              <div className="flow-root mt-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">
                  Ítems Agregados:
                </h3>
                <ul
                  Role="list"
                  className="-my-6 divide-y divide-gray-200 border border-gray-200 rounded-md"
                >
                  {items.map((item, index) => (
                    <li
                      key={item.id || index}
                      className="flex py-4 px-4 hover:bg-gray-50"
                    >
                      {" "}
                      {/* Added item.id for key */}
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.description || item.code || "Ítem"}</h3>
                            <p className="ml-4">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Código: {item.code || "N/A"} | Cant: {item.quantity}{" "}
                            x ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>
                        {/* TODO: Add remove item button */}
                      </div>
                    </li>
                  ))}
                </ul>
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
                subtotal:{" "}
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
                total:{" "}
                <span className="font-extrabold">
                  ${formData.total.toFixed(2)}
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150 text-lg"
            >
              Guardar Pedido
            </button>
          </section>
        </form>
      </div>

      {showItemSearchModal && (
        <MyWindowPortal
          title="Buscar Ítems"
          width={1000} // Ajustar según necesidad
          height={700} // Ajustar según necesidad
        >
          <ItemSearchModal
            isOpen={true} // El modal dentro del portal siempre está "abierto" si el portal existe
            onClose={() => setShowItemSearchModal(false)} // Esta onClose cerrará el portal
            onItemSelect={(item) => {
              handleSelectItemFromModal(item);
              setShowItemSearchModal(false); // Cerrar el portal después de seleccionar
            }}
            companyId={userInfo?.companyId}
            branchId={userInfo?.branchId}
            // Pasamos una función para que el modal pueda cerrar su propia ventana/portal
            // Esto es útil si el modal tiene su propio botón de "Cerrar" interno que deba
            // funcionar independientemente del onClose que se pasa desde OrderCreate.
            // Sin embargo, el ItemSearchModal ya usa la prop onClose para esto.
            // Así que el onClose que ya tiene debería funcionar para cerrar el portal.
          />
        </MyWindowPortal>
      )}
    </div>
  );
}
