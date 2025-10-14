import { Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { BranchCombo } from "../branch/BranchCombo";
import { CompanyCombo } from "../company/CompanyCombo";
import type { Branch, Company } from "./stockTypes";

interface CompanyBranchSelectorProps {
  companyID: string;
  branchID: string;
  companies: Company[];
  filteredBranches: Branch[];
  onCompanyChange: (value: string) => void;
  onBranchChange: (value: string) => void;
  onCompanySearchClick: () => void;
  onBranchSearchClick: () => void;
  isLoading?: boolean;
}

export function CompanyBranchSelector({
  companyID,
  branchID,
  companies,
  filteredBranches,
  onCompanyChange,
  onBranchChange,
  onCompanySearchClick,
  onBranchSearchClick,
  isLoading = false,
}: CompanyBranchSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        <CompanyCombo
          onSelect={(value) => onCompanyChange(value)}
          defaultValue={String(companyID)}
        />
        <BranchCombo
          onSelect={(value) => onBranchChange(value)}
          defaultValue={String(branchID)}
          companyID={companyID || undefined}
        />
      </div>

      {/* Branch Selection */}
      <div className="flex space-x-2 items-center">
        <Button
          type="button"
          onClick={onCompanySearchClick}
        >
          <Search className="h-4 w-4" />
          Compañía
        </Button>
        <Button
          type="button"
          onClick={onBranchSearchClick}
        >
          <Search className="h-4 w-4" />
          Sucursal
        </Button>
      </div>
    </div>
  );
}
