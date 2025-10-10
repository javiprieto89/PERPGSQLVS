"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { useEffect, useState } from "react"
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
import { useGetAllCompaniesQuery } from "~/graphql/_generated/graphql"
import { cn } from "~/lib/utils"

export function CompanyCombo({ onSelect, defaultValue, id, className }: {
  onSelect: (value: string) => void;
  defaultValue?: string | null;
  id?: string;
  className?: string;
}) {
  const { data, loading, error } = useGetAllCompaniesQuery();
  const [open, setOpen] = useState(false)

  const [value, setValue] = useState(defaultValue || "")

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue])

  { error && <ApiErrorMessage error={error} /> }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger id={id} asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-2/3 justify-between", className)}
          >
            {loading ? "Loading..." : (
              value
                ? data?.allCompany.find((c) => String(c.CompanyID) === value)?.CompanyName
                : "Select company..."
            )}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-2/3 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search company..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data?.allCompany.map((c) => (
                  <CommandItem
                    key={c.CompanyID}
                    value={String(c.CompanyName)}
                    onSelect={() => {
                      const newValue = value === String(c.CompanyID) ? "" : String(c.CompanyID);
                      setValue(newValue)
                      onSelect(newValue);
                      setOpen(false)
                    }}
                  >
                    {c.CompanyName}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === String(c.CompanyID) ? "opacity-100" : "opacity-0"
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
