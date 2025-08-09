import { useEffect, useState } from "react";

import { useGetOrderMassiveQuery } from "~/graphql/_generated/graphql";
import {
  carOperations,
  discountOperations,
  itemOperations,
  orderOperations,
  orderStatusOperations,
  pricelistItemOperations,
  pricelistOperations,
  saleConditionOperations,
  serviceTypeOperations,
  tempOrderOperations,
  warehouseOperations,
} from "~/graphql/operations.js";

export default function useGraphql() {
  // const { data, loading, error, refetch } = useGetOrderMassiveQuery();
  const { data, error } = useGetOrderMassiveQuery();

  console.log("HOOK", { data, error });

  const [serviceTypes, setServiceTypes] = useState([]);
  const [cars, setCars] = useState([]);
  const [saleConditions, setSaleConditions] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priceLists, setPriceLists] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  const [sessionId, setSessionId] = useState(null);

  async function getItemById(itemId) {
    return await itemOperations.getItemById(itemId);
  }

  async function updateTempItem(orderSessionId, itemId, baseData) {
    return await tempOrderOperations.updateTempItem(
      orderSessionId,
      itemId,
      baseData
    );
  }

  async function updateOrder(orderId, orderData) {
    return await orderOperations.updateOrder(orderId, orderData);
  }

  async function createOrder(orderData) {
    return await orderOperations.createOrder(orderData);
  }

  async function filterPriceList(key, priceListId, itemId) {
    return await pricelistItemOperations.getFiltered(priceListId, itemId);
  }

  async function fetchAllCars(clientId) {
    const cars = await carOperations.getAllCars();
    const filtered =
      cars.length > 0
        ? cars.filter((car) => car.ClientID === Number(clientId))
        : cars;
    setCars(filtered);
  }

  async function fetchOrderEdit(orderId, userId, companyId, branchId) {
    const sid = await tempOrderOperations.loadOrderForEditing(
      orderId,
      userId,
      companyId,
      branchId
    );
    setSessionId(sid);
    return sid;
  }

  async function getTempItemsByOrder(orderId) {
    return await tempOrderOperations.getTempItemsByOrder(orderId);
  }

  async function createTempItem(tempData) {
    if (sessionId) {
      tempData.OrderSessionID = sessionId;
    }
    const tempItem = await tempOrderOperations.createTempItem(tempData);
    setSessionId(tempItem.OrderSessionID);
    return tempItem;
  }

  async function deleteTempItem(orderSessionId, itemId) {
    await tempOrderOperations.deleteTempItem(orderSessionId, itemId);
  }

  async function clearTempSession({ useKeepAlive = false }) {
    if (!sessionId) return;
    await tempOrderOperations.clearTempSession(sessionId, useKeepAlive);
  }

  useEffect(() => {
    const fetchData = async () => {
      const [st, sc, d, os, pl, wh] = await Promise.all([
        serviceTypeOperations.getAllServicetypes(),
        saleConditionOperations.getAllSaleConditions(),
        discountOperations.getAllDiscounts(),
        orderStatusOperations.getAllOrderstatus(),
        pricelistOperations.getAllPricelists(),
        warehouseOperations.getAllWarehouses(),
      ]);
      setServiceTypes(st);
      setSaleConditions(sc);
      setDiscounts(d);
      setStatuses(os);
      setPriceLists(pl);
      setWarehouses(wh);
    };
    fetchData();
  }, []);

  return {
    serviceTypes,
    cars,
    saleConditions,
    discounts,
    statuses,
    priceLists,
    warehouses,
    sessionId,
    fetchAllCars,
    createOrder,
    updateOrder,
    getItemById,
    updateTempItem,
    filterPriceList,
    fetchOrderEdit,
    getTempItemsByOrder,
    createTempItem,
    deleteTempItem,
    clearTempSession,
  };
}
