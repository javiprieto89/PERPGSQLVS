import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

interface SelectedAccess {
  userID: number;
  companyid: number;
  companyName: string;
  branchID: number;
  branchName: string;
  roleID: number;
  roleName: string;
}
/**
 * selecredAccess: {
 * "userID":1,
 * "companyID":1,
 * "companyName":"CT",
 * "branchID":1,
 * "branchName":"CENTRAL",
 * "roleID":1,
 * "roleName":"Admin"
 * }
 */
const selectedAccessAtom = atom<SelectedAccess | null>(null);

export function useAuthSelectedAccess() {
  const [selectedAccess, setSelectedAccess] = useAtom(selectedAccessAtom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function checkStoredAccess() {
    try {
      setLoading(true);

      // Cargar acceso seleccionado del sessionStorage
      const storedSelected = sessionStorage.getItem("selected_access");

      if (storedSelected) {
        const selected = JSON.parse(storedSelected) as SelectedAccess;
        setSelectedAccess(selected);
        return selected;
      } else {
        // Si no hay acceso seleccionado, verificar si hay datos de acceso
        const storedAccess = sessionStorage.getItem("access_data");
        if (storedAccess) {
          const parsedAccess = JSON.parse(storedAccess);
          if (parsedAccess.length > 0) {
            const firstAccess = parsedAccess[0];
            sessionStorage.setItem(
              "selected_access",
              JSON.stringify(firstAccess)
            );
            setSelectedAccess(firstAccess);
            return firstAccess;
          } else {
            setError("No hay accesos configurados para este usuario.");
          }
        } else {
          setError("No se pudieron cargar los datos de acceso del usuario.");
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Error inicializando dashboard:", (err as Error).message);
      setError("Error al cargar el dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkStoredAccess();
  }, []);

  return {
    errorAcess: error,
    selectedAccess,
    loadingSelectedAccess: loading,
  };
}
