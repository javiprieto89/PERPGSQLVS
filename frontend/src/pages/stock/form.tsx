// frontend/src/pages/stock/StockEntry.tsx

import BranchSearchModal from "~/components/BranchSearchModal";
import ItemConfirmationModal from "~/components/ItemConfirmationModal";
import ItemSearchModal from "~/components/ItemSearchModal";
import CompanySearchModal from "~/features/company/CompanySearchModal";

import { Search } from "lucide-react";
import { Link } from "react-router";
import { Fieldset } from "~/components/form/Fieldset";
import { FormBlock } from "~/components/form/FormBlock";
import { Submit } from "~/components/form/InputSubmit";
import { AlertLoading } from "~/components/ui-admin/AlertLoading";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import { Button } from "~/components/ui/button";
import { BranchCombo } from "~/features/branch/BranchCombo";
import { CompanyCombo } from "~/features/company/CompanyCombo";
import { StockEntriesTable } from "~/features/stock/StockEntriesTable";
import { BASE_ROUTE, useStockEntry } from "~/features/stock/useStockEntry";

export default function StockEntry() {
  const {
    warehouses,
    companies,
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
  } = useStockEntry();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Ingreso de Stock</h1>

      {error && <ApiErrorMessage error={error} />}
      {loading && <AlertLoading message="Loading..." />}

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <CompanyCombo
            onSelect={(value) => setCompanyID(value)}
            defaultValue={String(companyID)}
          />
          <BranchCombo
            onSelect={(value) => setBranchID(value)}
            defaultValue={String(branchID)}
            companyID={companyID ? String(companyID) : undefined}
          />
        </div>

        <div className="flex space-x-2 items-center">
          <Button
            type="button"
            onClick={() => setShowCompanyModal(true)}
          >
            <Search className="h-4 w-4" />
            Compañía
          </Button>
          <Button
            type="button"
            onClick={() => setShowBranchModal(true)}
          >
            <Search className="h-4 w-4" />
            Sucursal
          </Button>
        </div>
      </div>

      <button
        onClick={() => setShowItemSearch(true)}
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Buscar Ítem
      </button>

      <StockEntriesTable entries={entries} warehouses={warehouses} />

      <Fieldset className="items-center">
        <FormBlock className="p-4 space-x-2 flex justify-between bg-card">
          <Link className="mt-auto" to={BASE_ROUTE}>Cancel</Link>
          <Submit onClick={handleProcess} disabled={loading}>
            Guardar
          </Submit>
        </FormBlock>
      </Fieldset>

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
          companies={companies}
          isOpen={true}
          onClose={() => setShowCompanyModal(false)}
          onSelect={handleCompanySelect}
        />
      )}

      {showBranchModal && (
        <BranchSearchModal
          isOpen={true}
          companyID={String(companyID)}
          onClose={() => setShowBranchModal(false)}
          onSelect={handleBranchSelect}
        />
      )}
    </div>
  );
}
