import { ChevronDown } from "lucide-react";
import { useRef } from "react";

import { useClickOutside } from "~/hooks/useClickOutside";
import { useUser } from "~/hooks/useUser";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type UserAccess } from "~/utils/authHelper";

export function BranchAccessDropdown({ onAccessChange }: { onAccessChange?: (access: UserAccess) => void }) {
  const { changeSelectedAccess, selectedAccess, userAccesses } = useUser();

  const accessDropdownRef = useRef(null);

  // Cerrar dropdowns cuando se hace click fuera
  const [showAccessDropdown, setShowAccessDropdown] = useClickOutside({
    defaultState: false,
    ref: accessDropdownRef,
  });

  return (
    <div
      className="w-full inline-flex items-center relative"
      ref={accessDropdownRef}
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
                  console.log("access", access)
                  const company = access.Company || "Sin empresa";
                  const branch = access.Branch || "Sin sucursal";
                  const role = access.Role || "Sin rol";
                  const isSelected =
                    company === selectedAccess?.Company &&
                    branch === selectedAccess?.Branch &&
                    role === selectedAccess?.Role;

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
                      {isSelected ? (
                        <div className="flex items-center mt-1 shrink-0 w-4">
                          <svg
                            className="h-3 w-3 text-primary mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                            <span className="sr-only">Activo</span>
                          </svg>
                        </div>
                      ) : (
                        <div className="flex items-center mt-1 shrink-0 min-w-4"></div>
                      )}
                      <div className="flex justify-left flex-col w-full">
                        <div>{selectedAccess?.Company}</div>
                        <div className="text-left text-xs text-muted-foreground">
                          {branch}
                        </div>
                      </div>
                      <Badge className="m-l-auto">{role}</Badge>
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