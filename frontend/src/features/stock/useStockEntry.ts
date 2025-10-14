// frontend/src/features/stock/useStockEntry.ts

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { tempStockOperations } from "~/services/stock.service";

import { useGetStockEntryFormDataQuery } from "~/graphql/_generated/graphql";
import { AuthHelper } from "~/utils/authHelper";
import { stockHelpers } from "./stockHelpers";
import type {
  Branch,
  Company,
  Item,
  StockEntryDetails,
  TempStockEntry,
} from "./stockTypes";

interface UseStockEntryOptions {
  onClose?: () => void;
}

export const BASE_ROUTE = "/";

export function useStockEntry({ onClose }: UseStockEntryOptions = {}) {
  const userAccess = AuthHelper.getSelectedAccess();
  const [sessionId] = useState(() => crypto.randomUUID());
  const { data, error, loading, refetch } = useGetStockEntryFormDataQuery();
  const warehouses = data?.warehouses || [];
  const companies = data?.companies || [];
  const branches = data?.branches || [];

  const [entries, setEntries] = useState<TempStockEntry[]>([]);

  const [showItemSearch, setShowItemSearch] = useState(false);
  const [showItemConfirm, setShowItemConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [companyID, setCompanyID] = useState(userAccess?.CompanyID || "");
  const [branchID, setBranchID] = useState(userAccess?.BranchID || "");
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        // Load entries
        try {
          console.log("Loading entries for session:", sessionId);
          const data = await tempStockOperations.getSessionEntries(sessionId);
          console.log("Entries loaded:", data);
          setEntries(data || []);
        } catch (error) {
          console.error("Error loading entries:", error);
          setEntries([]);
        }
      } catch (err) {
        console.error("Error initializing component:", err);
      }
    };

    initializeComponent();
  }, [sessionId]);

  // Load entries from session
  const loadEntries = async () => {
    try {
      console.log("Loading entries for session:", sessionId);
      const data = await tempStockOperations.getSessionEntries(sessionId);
      console.log("Entries loaded:", data);
      setEntries(data || []);
    } catch (error) {
      console.error("Error loading entries:", error);
      setEntries([]);
    }
  };

  // Handle item selection from search modal
  const handleSelectItem = (item: Item) => {
    const normalizedItem = stockHelpers.normalizeItem(item);
    setSelectedItem(normalizedItem);
    setShowItemSearch(false);
    setShowItemConfirm(true);
  };

  // Handle item confirmation
  const handleConfirmItem = async (details: StockEntryDetails) => {
    if (!selectedItem) return;

    try {
      const itemId = stockHelpers.getItemId(selectedItem);
      const data = stockHelpers.createEntryData({
        sessionId,
        companyID: String(userAccess?.CompanyID),
        branchID: String(userAccess?.BranchID),
        userId: userAccess?.UserID || 1,
        itemID: itemId,
        warehouseId: details.warehouseId,
        quantity: details.quantity || quantity,
      });

      await tempStockOperations.createEntry(data);
      setSelectedItem(null);
      setShowItemConfirm(false);
      setQuantity(1);
      await loadEntries();
      toast.success("Item agregado correctamente");
    } catch (error) {
      console.error("Error confirming item:", error);
      toast.error("Error al guardar el item");
    }
  };

  // Handle company change
  const handleCompanyChange = (value: string) => {
    setCompanyID(value);
    // Reset branch when company changes
    setBranchID("");
  };

  // Handle company selection from modal
  const handleCompanySelect = (company: Company) => {
    setCompanyID(String(company.CompanyID));
    setShowCompanyModal(false);
  };

  // Handle branch selection from modal
  const handleBranchSelect = (branch: Branch) => {
    setBranchID(String(branch.BranchID));
    if (!companyID) setCompanyID(String(branch.CompanyID));
    setShowBranchModal(false);
  };

  // Process session and close
  const handleProcess = async () => {
    if (entries.length === 0) {
      toast.error("No hay entradas para procesar");
      return;
    }

    try {
      await tempStockOperations.processSession(sessionId);
      toast.success("Sesión procesada correctamente");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Error processing session:", error);
      toast.error("Error al procesar la sesión");
    }
  };

  return {
    // State
    sessionId,
    warehouses,
    companies,
    branches,
    entries,
    showItemSearch,
    showItemConfirm,
    selectedItem,
    companyID,
    branchID,
    showCompanyModal,
    showBranchModal,
    quantity,
    loading,
    error,

    // Setters
    setShowItemSearch,
    setShowItemConfirm,
    setCompanyID: handleCompanyChange,
    setBranchID,
    setShowCompanyModal,
    setShowBranchModal,
    setQuantity,

    // Handlers
    handleSelectItem,
    handleConfirmItem,
    handleCompanySelect,
    handleBranchSelect,
    handleProcess,
    loadEntries,
  };
}
