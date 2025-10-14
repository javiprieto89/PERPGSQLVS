"use client"

import { useEffect, useMemo, useState } from "react"
import { SelectWithSearch } from "~/components/form/SelectWithSearch"
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage"

import { useGetAllBranchesQuery } from "~/graphql/_generated/graphql"

export function BranchCombo({ onSelect, companyID, id, defaultValue, className, label, placeholder, ...props }: {
  onSelect: (value: string) => void;
  defaultValue?: string | null;
  companyID?: string | undefined;
  id?: string;
  value?: string | null;
  className?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  label?: string;
  placeholder?: string;
}) {
  const { data, loading, error: apolloError } = useGetAllBranchesQuery();

  const availableBranches = useMemo(() =>
    companyID && data?.allBranches ? data?.allBranches.filter(
      (b) => b.CompanyID === parseInt(companyID)
    ) : [], [companyID, data?.allBranches]);

  const [value, setValue] = useState(defaultValue || "")

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue])

  const selectedValue = availableBranches.find((row) => String(row.BranchID) === value);

  { apolloError && <ApiErrorMessage error={apolloError} /> }

  return (
    <>
      <SelectWithSearch
        label={label || "Sucursal"}
        placeholder={loading ? "Loading..." : placeholder}
        onSelect={(val) => {
          const newValue = value === String(val) ? "" : String(val);
          setValue(newValue)
          onSelect(newValue);
        }}
        defaultValue={defaultValue}
        accessor="BranchID"
        display="BranchName"
        data={availableBranches}
        loading={loading}
        {...props}
      />
    </>
  )
}
