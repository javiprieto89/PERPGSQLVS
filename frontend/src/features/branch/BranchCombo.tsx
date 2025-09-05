"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useMemo, useState } from "react"
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage"

import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { useGetAllBranchesQuery } from "~/graphql/_generated/graphql"
import { cn } from "~/lib/utils"

export function BranchCombo({ onSelect, companyID, id, value }: {
  onSelect: (value: string) => void;
  companyID?: string | undefined;
  id?: string;
  value?: string | null;
}) {
  const { data, loading, error } = useGetAllBranchesQuery();
  const [open, setOpen] = useState(false);

  const availableBranches = useMemo(() =>
    companyID && data?.allBranches ? data?.allBranches.filter(
      (b) => b.CompanyID === parseInt(companyID)
    ) : [], [companyID, data?.allBranches]);

  const selectedValue = availableBranches.find((row) => String(row.BranchID) === value);

  { error && <ApiErrorMessage error={error} /> }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} asChild disabled={availableBranches.length === 0}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {loading ? "Loading..." : (
              value && selectedValue
                ? selectedValue?.Name
                : "Select branch..."
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search company..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {availableBranches.map((row) => (
                  <CommandItem
                    key={row.BranchID}
                    value={String(row.Name)}
                    onSelect={(currentValue) => {
                      const newValue = value === String(row.BranchID) ? "" : String(row.BranchID);
                      onSelect(newValue);
                      setOpen(false)
                    }}
                  >
                    {row.Name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === String(row.BranchID) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
