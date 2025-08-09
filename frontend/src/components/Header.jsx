// src/components/Header.jsx
import { ChevronDown, House, LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthHelper } from "../utils/authHelper";

import { Badge } from "~/components/ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function Header({
  userInfo,
  selectedAccess,
  onChange,
  onLogout,
}) {
  const [showAccessDropdown, setShowAccessDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [userAccesses, setUserAccesses] = useState([]);

  const accessDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Cargar accesos del usuario
  useEffect(() => {
    const accesses = AuthHelper.getUserAccess();
    setUserAccesses(accesses);
  }, []);

  // Cerrar dropdowns cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accessDropdownRef.current &&
        !accessDropdownRef.current.contains(event.target)
      ) {
        setShowAccessDropdown(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cambiar acceso seleccionado
  const handleAccessChange = (access) => {
    setShowAccessDropdown(false);
    if (onChange) {
      onChange(access);
    }
    // También actualizar en AuthHelper
    AuthHelper.setSelectedAccess(access);
  };

  // Logout
  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) {
      onLogout();
    }
  };

  // Obtener información del acceso seleccionado
  const currentAccess = selectedAccess || AuthHelper.getSelectedAccess() || {};
  const displayCompany = currentAccess.Company || currentAccess.companyName;
  const displayBranch = currentAccess.Branch || currentAccess.branchName;
  const displayRole = currentAccess.Role || currentAccess.roleName;

  return (
    <header className="card shadow-sm border-b">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Lado izquierdo: Home + Selector de Acceso */}
          <div className="flex items-center space-x-4">
            {/* Botón Home */}
            <Button asChild title="Ir al Dashboard Principal">
              <NavLink to="dashboard">
                <House />
                Dashboard
              </NavLink>
            </Button>

            {/* Selector de Empresa/Sucursal/Rol */}
            <div
              className="inline-flex items-center relative"
              ref={accessDropdownRef}
            >
              <Button
                className="min-w-3xs"
                onClick={() => setShowAccessDropdown(!showAccessDropdown)}
              >
                <div className="flex justify-left flex-col w-full">
                  <div className="text-left">{displayCompany}</div>
                  <div className="text-left text-xs text-muted-foreground">
                    Sucursal: {displayBranch}
                  </div>
                </div>
                <Badge className="m-l-auto">{displayRole}</Badge>
                <ChevronDown />
              </Button>

              {/* Dropdown de accesos */}
              {showAccessDropdown && (
                <div className="absolute bg-background top-full left-0 mt-2 w-full rounded-md shadow-lg z-50">
                  <div className="py-1 max-h-80 overflow-y-auto">
                    <div className="px-4 py-2 text-xs font-medium  border-b">
                      Seleccionar Acceso
                    </div>
                    <div className="mx-1 py-2">
                      {userAccesses.length > 0 ? (
                        userAccesses.map((access, index) => {
                          const company =
                            access.Company ||
                            access.companyName ||
                            "Sin empresa";
                          const branch =
                            access.Branch ||
                            access.branchName ||
                            "Sin sucursal";
                          const role =
                            access.Role || access.roleName || "Sin rol";
                          const isSelected =
                            company === displayCompany &&
                            branch === displayBranch &&
                            role === displayRole;

                          return (
                            <Button
                              key={index}
                              variant="ghost"
                              size="lg"
                              onClick={() => handleAccessChange(access)}
                              className={`w-full text-left text-sm justify-start mt-1 py-0 px-3 ${
                                isSelected ? "bg-primary/10 text-primary" : ""
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
                                    <span class="sr-only">Activo</span>
                                  </svg>
                                </div>
                              ) : (
                                <div className="flex items-center mt-1 shrink-0 min-w-4"></div>
                              )}
                              <div className="flex justify-left flex-col w-full">
                                <div>{company}</div>
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
          </div>

          {/* Lado derecho: Info de usuario */}
          <div className="flex items-center space-x-4">
            {/* Información de usuario y logout */}
            <div className="relative" ref={userDropdownRef}>
              <Button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-3 text-sm rounded-full py-5 pl-1"
                title={userInfo?.Fullname || userInfo?.Nickname || "Usuario"}
              >
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="h-8 aspect-square rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
                    <span className="text-sm">
                      {userInfo?.Nickname
                        ? userInfo.Nickname.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  </div>
                  <ChevronDown />
                </div>
              </Button>

              {/* Dropdown de usuario */}
              {showUserDropdown && (
                <Card className="absolute top-[110%] right-0 z-50 bg-card text-card-foreground flex flex-col gap-2 rounded-xl border p-2 shadow-sm w-full min-w-56">
                  <div className="p-2 border-b">
                    <div className="text-left flex justify-between gap-2">
                      {userInfo?.Fullname || userInfo?.Nickname || "Usuario"}
                      {displayRole && (
                        <Badge variant="secondary" lassName="text-xs ">
                          {" "}
                          {displayRole}
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm ">
                      {userInfo?.Nickname && userInfo?.Fullname
                        ? `@${userInfo.Nickname}`
                        : ""}
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start text-sm mt-4 text-destructive bg-destructive/5 hover:bg-destructive/10"
                  >
                    <LogOut />
                    Cerrar Sesión
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
