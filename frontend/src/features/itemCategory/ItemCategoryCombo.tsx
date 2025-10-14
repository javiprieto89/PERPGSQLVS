"use client"

import { useEffect, useState } from "react"
import { SelectWithSearch } from "~/components/form/SelectWithSearch"
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage"

import { useGetAllItemCategoriesQuery } from "~/graphql/_generated/graphql"

export function ItemCategoryCombo({ onSelect, id, defaultValue, className, label, placeholder, ...props }: {
  onSelect: (value: string) => void;
  defaultValue?: string | null;
  id?: string;
  value?: string | null;
  className?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  label?: string;
  placeholder?: string;
}) {
  const { data, loading, error: apolloError } = useGetAllItemCategoriesQuery();

  const [value, setValue] = useState(defaultValue || "")

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue])

  { apolloError && <ApiErrorMessage error={apolloError} /> }

  return (
    <SelectWithSearch
      label={label || "Categoría"}
      placeholder={loading ? "Loading..." : placeholder}
      onSelect={(val) => {
        const newValue = value === String(val) ? "" : String(val);
        setValue(newValue)
        onSelect(newValue);
      }}
      defaultValue={defaultValue}
      accessor="ItemCategoryID"
      display="CategoryName"
      data={data?.allItemcategories}
      loading={loading}
      {...props}
    />
  )
}
