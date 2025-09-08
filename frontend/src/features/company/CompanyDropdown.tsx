import { useGetAllCompaniesQuery } from "~/graphql/_generated/graphql";

import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";

export function CompanyDropdown({ ...props }) {
  const { data, loading, error } = useGetAllCompaniesQuery();

  { error && <ApiErrorMessage error={error} /> }

  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={loading ? "loading..." : "Select a Company"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          {data?.allCompanydata.map((c) => (
            <SelectItem
              key={c.CompanyID}
              value={String(c.CompanyID)}
            >
              {c.Name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}