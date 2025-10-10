"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { ApiErrorMessage } from "~/components/ui-admin/ApiErrorMessage";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";

type SelectWithSearchProps<T extends Record<string, unknown>> = {
  className?: string;
  /** Callback al seleccionar un valor */
  onSelect: (value: string) => void;
  /** Propiedad usada como identificador único */
  accessor: keyof T;
  /** Propiedad mostrada en la UI */
  display: keyof T;
  /** Datos a renderizar */
  data?: T[];
  /** Placeholder */
  placeholder?: string;
  /** Valor por defecto */
  defaultValue?: string | null;
  /** ID opcional */
  id?: string;
  name?: string;
  /** Estado de carga */
  loading?: boolean;
  /** Mensaje de error opcional */
  error?: string;
};

export function SelectWithSearch<T extends Record<string, unknown>>({
  className,
  onSelect,
  accessor,
  display,
  data = [],
  placeholder = "Select...",
  defaultValue = "",
  loading = false,
  error,
}: SelectWithSearchProps<T>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const selectedData = data.find(
    (d) => String(d[accessor]) === String(value)
  );


  return (
    <div className="flex flex-col gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
          >
            {loading
              ? "Loading..."
              : selectedData
                ? String(selectedData[display])
                : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[90vw] max-w-[600px] md:w-[40vw] md:max-w-[350px] lg:w-[45vw] min-w-[280px] lg:max-w-[390px]" align="start">
          <Command>
            <CommandInput
              placeholder="Search..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data.map((d) => {
                  const itemValue = String(d[accessor]);
                  const itemLabel = String(d[display]);

                  return (
                    <CommandItem
                      key={itemValue}
                      value={itemLabel}
                      onSelect={() => {
                        const newValue = value === String(d[accessor]) ? "" : String(d[accessor])
                        setValue(newValue)
                        onSelect(newValue)
                        setOpen(false)
                      }}
                    >
                      {itemLabel}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === itemValue ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && <ApiErrorMessage error={{ message: error }} />}
    </div>
  );
}
