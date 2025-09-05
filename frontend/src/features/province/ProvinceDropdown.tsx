"use client"

import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useGetProvincesByCountryQuery } from "~/graphql/_generated/graphql";

export function ProvinceDropdown({ onValueChange, countryId, id, value }: {
  onValueChange: (value: string) => void;
  countryId?: string;
  id?: string;
  value?: string;
}) {
  const { data, loading, error } = useGetProvincesByCountryQuery({
    variables: {
      countryID: Number(countryId)
    }
  });

  { error && <ApiErrorMessage error={error} /> }

  console.log({ countryId, data, value })

  return (
    <Select
      value={value}
    >
      <SelectTrigger id={id} className="w-[180px]">
        <SelectValue placeholder={loading ? "Loading..." : data?.provincesByCountry.length === 0 ? "Sin opciones" : "Seleccione..."} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data?.provincesByCountry.map((row) => (
            <SelectItem key={`provinceID-${row.ProvinceID}`} value={String(row.ProvinceID)} onSelect={() => onValueChange(String(row.ProvinceID))}>
              {row.Name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
