// frontend/src/pages/stock/StockEntry.tsx

import BranchSearchModal from "~/components/BranchSearchModal";
import ItemConfirmationModal from "~/components/ItemConfirmationModal";
import ItemSearchModal from "~/components/ItemSearchModal";
import { Button } from "~/components/ui/button";
import CompanySearchModal from "~/features/company/CompanySearchModal";

import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { CompanyBranchSelector } from "~/features/stock/CompanyBranchSelector";
import { StockEntriesTable } from "~/features/stock/StockEntriesTable";
import type { UserInfo } from "~/features/stock/stockTypes";
import { useStockEntry } from "~/features/stock/useStockEntry";

interface StockEntryProps {
  onClose: () => void;
  windowRef: any;
  userInfo?: UserInfo;
}

export default function StockEntry({ onClose, windowRef, userInfo }: StockEntryProps) {
  const {
    warehouses,
    companies,
    filteredBranches,
    entries,
    showItemSearch,
    showItemConfirm,
    selectedItem,
    companyID,
    branchID,
    showCompanyModal,
    showBranchModal,
    loading,
    error,
    setShowItemSearch,
    setShowItemConfirm,
    setCompanyID,
    setBranchID,
    setShowCompanyModal,
    setShowBranchModal,
    handleSelectItem,
    handleConfirmItem,
    handleCompanySelect,
    handleBranchSelect,
    handleProcess,
  } = useStockEntry({ userInfo, onClose: () => windowRef.close() });

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <ApiErrorMessage error={error} />
        <button onClick={onClose} className="px-4 py-2 rounded">
          Cerrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ingreso de Stock</h1>

      <CompanyBranchSelector
        companyID={companyID}
        branchID={branchID}
        companies={companies}
        filteredBranches={filteredBranches}
        onCompanyChange={setCompanyID}
        onBranchChange={setBranchID}
        onCompanySearchClick={() => setShowCompanyModal(true)}
        onBranchSearchClick={() => setShowBranchModal(true)}
      />

      <button
        onClick={() => setShowItemSearch(true)}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Buscar Ítem
      </button>

      <StockEntriesTable entries={entries} warehouses={warehouses} />

      <div className="flex justify-end gap-2">
        <Button variant="primary" onClick={handleProcess}>
          Guardar
        </Button>
        <button onClick={onClose} className="px-4 py-2 rounded">
          Cancelar
        </button>
      </div>

      {/* Modals */}
      {showItemSearch && (
        <ItemSearchModal
          isOpen={true}
          onClose={() => setShowItemSearch(false)}
          onItemSelect={handleSelectItem}
        />
      )}

      {showItemConfirm && selectedItem && (
        <ItemConfirmationModal
          isOpen={true}
          item={selectedItem}
          onClose={() => setShowItemConfirm(false)}
          onConfirm={handleConfirmItem}
          warehouses={warehouses}
        />
      )}

      {showCompanyModal && (
        <CompanySearchModal
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={handleCompanySelect}
        />
      )}

      {showBranchModal && (
        <BranchSearchModal
          isOpen={true}
          companyID={companyID}
          onClose={() => setShowBranchModal(false)}
          onSelect={handleBranchSelect}
        />
      )}
    </div>
  );
}
