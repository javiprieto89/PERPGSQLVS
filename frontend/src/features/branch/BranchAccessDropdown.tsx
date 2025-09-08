import { Check, ChevronDown } from "lucide-react";
import { useRef } from "react";

import { useClickOutside } from "~/hooks/useClickOutside";
import { useUser } from "~/hooks/useUser";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type UserAccess } from "~/utils/authHelper";

export function BranchAccessDropdown({ onAccessChange }: { onAccessChange?: (access: UserAccess) => void }) {
  const { changeSelectedAccess, selectedAccess, userAccesses, loading } = useUser();

  const accessDropdownRef = useRef(null);

  // Cerrar dropdowns cuando se hace click fuera
  const [showAccessDropdown, setShowAccessDropdown] = useClickOutside({
    defaultState: false,
    ref: accessDropdownRef,
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.code) {
      case 'Escape':
      case 'Space':
      case 'Spacebar':
        event.preventDefault();
        setShowAccessDropdown(!showAccessDropdown);
        break;
    }
  };

  function getIsSelected(access: UserAccess) {
    const company = access.Company || "Sin empresa";
    const branch = access.Branch || "Sin sucursal";
    const role = access.Role || "Sin rol";
    return company === selectedAccess?.Company &&
      branch === selectedAccess?.Branch &&
      role === selectedAccess?.Role;
  }

  return (
    <div
      className="w-full inline-flex items-center relative"
      ref={accessDropdownRef}
      onKeyUp={(event: any) => {
        handleKeyDown(event as React.KeyboardEvent<HTMLButtonElement>);
      }}
    >
      <Button
        className="w-full"
        onClick={() => setShowAccessDropdown(!showAccessDropdown)}
      >
        <div className="flex justify-left flex-col w-full">
          <div className="text-left">{selectedAccess?.Company}</div>
          <div className="text-left text-xs text-muted-foreground">
            {selectedAccess?.Branch}
          </div>
        </div>
        <Badge className="m-l-auto">{selectedAccess?.Role}</Badge>
        <ChevronDown />
      </Button>

      {/* Dropdown de accesos */}
      {showAccessDropdown && (
        <div className="absolute bg-popover border-1 top-full left-0 mt-2 w-full rounded-md shadow-lg z-50">
          <div className="py-1 max-h-80 overflow-y-auto">
            <div className="px-4 py-2 text-xs font-medium  border-b">
              Seleccione un acceso
            </div>
            <div className="mx-1 py-2">
              {userAccesses ? (
                userAccesses.map((access, index) => {
                  const isSelected = getIsSelected(access);
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        setShowAccessDropdown(false);
                        onAccessChange?.(access);
                        changeSelectedAccess(access);
                      }}
                      className={`w-full text-left text-sm justify-start mt-1 py-0 px-3 ${isSelected ? "bg-primary/10 text-primary" : ""
                        }`}
                    >
                      <div className="flex justify-between w-[180px] items-center">
                        <div className="flex justify-left flex-col w-full">
                          <div className="text-sm/4">{access.Company || "Sin empresa"}</div>
                          <div className="text-left text-xs text-muted-foreground">
                            {access.Branch || "Sin sucursal"}
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="m-l-auto">{access.Role || "Sin rol"}</Badge>
                        </div>
                      </div>
                      {isSelected ? (
                        <div className="flex items-center mt-1 shrink-0 w-4">
                          <Check />
                        </div>
                      ) : (
                        <div className="flex items-center mt-1 shrink-0 min-w-4"></div>
                      )}
                    </Button>
                  );
                })
              ) : (
                <span className="text-xs p-4">
                  No hay datos disponibles
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}