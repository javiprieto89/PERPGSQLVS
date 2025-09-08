import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { useState } from "react";

import { type GetAllClientsQuery, useGetAllClientsQuery } from "~/graphql/_generated/graphql";
import { cn } from "~/lib/utils";

import { Button, ButtonProps } from "~/components/ui/button";
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

function buildLabel(client: GetAllClientsQuery['allClients'][0] | undefined) {
  return client ? `${client.FirstName} ${client.LastName}` : null;
}

type ClientDropdownType = ButtonProps & {
  value: string | null;
  defaultValue: string | null;
  onSelect: (value: string) => void;
  id: string;
  name: string;
  disabled: false;
}

export default function ClientDropdown({
  value,
  defaultValue,
  onSelect = () => { },
  id = "clientSearch",
  name = "clientSearch",
  ...props
}: ClientDropdownType) {
  const { data, loading, error } = useGetAllClientsQuery();
  const [open, setOpen] = useState(false);
  const clients = data ? data.allClients : [];
  const selectedClient = clients.find(
    (client) => String(client.ClientID) === value
  );
  const label = value ? buildLabel(selectedClient) : "Seleccionar cliente...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
          {...props}
          disabled={!!error || props.disabled}
        >
          {loading ? (
            <>
              <Loader /> <span>Loading...</span>
            </>
          ) : (
            label
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput
            id={id}
            name={name}
            defaultValue={defaultValue}
            placeholder="Buscar cliente..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Vacío</CommandEmpty>
            <CommandGroup>
              {clients.map((client) => (
                <CommandItem
                  key={String(client.ClientID)}
                  value={String(client.ClientID)}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    onSelect(currentValue);
                  }}
                >
                  <div className="flex justify-between gap-2 w-full">
                    <span className="w-full">{buildLabel(client)} </span>
                    <span className="min-w-8 text-xs text-muted-foreground">
                      {client.ClientID}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      String(value) === String(client.ClientID) ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
