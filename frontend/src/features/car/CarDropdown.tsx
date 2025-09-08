import { Check, ChevronsUpDown, Loader } from "lucide-react";
import { useState } from "react";

import { type GetAllCarsQuery, useGetAllCarsQuery } from "~/graphql/_generated/graphql";
import { cn } from "~/lib/utils";

import { Button, type ButtonProps } from "~/components/ui/button";
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

function buildLabel(car: GetAllCarsQuery['allCars'][0] | undefined) {
  return car && car.CarModelData?.Model ? car.CarModelData.Model : "Seleccionar Vehículo";
}

type CarDropdownProps = ButtonProps & {
  value: string | null;
  defaultValue: string | null;
  onSelect: (value: string) => void;
  id: string;
  name: string;
  disabled: false;
};

export default function CarDropdown({
  value,
  defaultValue,
  onSelect = () => null,
  id = "clientSearch",
  name = "clientSearch",
  disabled = false,
  ...props
}: CarDropdownProps) {
  const { data, loading, error } = useGetAllCarsQuery();
  const [open, setOpen] = useState(false);
  const cars = data ? data.allCars : [];
  console.log({ cars });
  const selected = cars.find((car) => String(car.CarID) === value);

  console.log({ selected });

  // TODO figure if its possible to get only current clientID information from GraphQL
  // const filtered = cars.filter((car) => car.ClientID === Number(clientId))
  // console.log("filtered", filtered)

  const label = value ? buildLabel(selected) : "Seleccionar vehículo...";
  // -- Seleccionar un cliente primero... --

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
            disabled={!!error}
            {...props}
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
              placeholder={
                cars.length > 0
                  ? "Buscar"
                  : "Cliente sin vehículos registrados"
              }
              className="h-9"
              disabled={disabled}
            />
            <CommandList>
              <CommandEmpty>Vacío</CommandEmpty>
              <CommandGroup>
                {cars.map((car) => (
                  <CommandItem
                    key={String(car.CarID)}
                    value={String(car.CarID)}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      onSelect(currentValue);
                    }}
                  >
                    <div className="flex justify-between gap-2 w-full">
                      <span className="w-full">{buildLabel(car)} </span>
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        String(value) === String(car.CarID) ? "opacity-100" : "opacity-0"
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
  );
}
