// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import apiFetch from "../utils/apiFetch";

export default function Dashboard() {
  const [accessData, setAccessData] = useState([]);
  const [selectedAccess, setSelectedAccess] = useState(null);
  const [clientsCount, setClientsCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // --- CORRECCIÓN CRÍTICA AQUÍ: Ya NO hacemos un apiFetch("/useraccess") ---
    // En su lugar, cargamos los accesos del localStorage, que ya fueron guardados en el login.
    const storedAccess = localStorage.getItem("access_data");
    const storedSelected = localStorage.getItem("selected_access");

    if (storedAccess) {
      const parsedAccess = JSON.parse(storedAccess);
      setAccessData(parsedAccess);
      if (storedSelected) {
        setSelectedAccess(JSON.parse(storedSelected));
      } else if (parsedAccess.length > 0) {
        setSelectedAccess(parsedAccess[0]);
      } else {
        setError("No hay accesos configurados para este usuario.");
      }
    } else {
      // Esto ocurriría si no hay 'access_data' en localStorage, lo que indica un problema de login o configuración.
      setError("No se pudieron cargar los datos de acceso del usuario.");
    }

    // Obtener conteo de clientes
    apiFetch("/clients/count")
      .then((res) => {
        if (res && typeof res.count === "number") {
          setClientsCount(res.count);
        } else {
          setClientsCount(0);
          console.warn("Respuesta inesperada para el conteo de clientes:", res);
        }
      })
      .catch((err) => {
        console.error("Error cargando conteo de clientes:", err);
        setClientsCount(0);
      });

    // Obtener conteo de proveedores
    apiFetch("/suppliers/count")
      .then((res) => {
        if (res && typeof res.count === "number") {
          setSuppliersCount(res.count);
        } else {
          setSuppliersCount(0);
          console.warn(
            "Respuesta inesperada para el conteo de proveedores:",
            res
          );
        }
      })
      .catch((err) => {
        console.error("Error cargando conteo de proveedores:", err);
        setSuppliersCount(0);
      });
  }, []); // Dependencias vacías para que se ejecute solo al montar

  // La función handleChange ya no es necesaria aquí si el selector principal está en Layout.
  // Si el dashboard también tiene un selector, su lógica de cambio debería ser similar a la de Layout.
  // const handleChange = (e) => {
  //   const index = e.target.value;
  //   setSelectedAccess(accessData[index]);
  //   localStorage.setItem("selected_access", JSON.stringify(accessData[index])); // Asegúrate de guardar el cambio
  // };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-600">{error}</p>}

      {!error && selectedAccess && (
        <div className="mt-6">
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-bold mb-2">Clientes</h3>
              <p className="text-4xl font-semibold text-blue-600">
                {clientsCount}
              </p>
            </div>
            <div className="bg-white p-6 rounded shadow text-center">
              <h3 className="text-xl font-bold mb-2">Proveedores</h3>
              <p className="text-4xl font-semibold text-green-600">
                {suppliersCount}
              </p>
            </div>
          </div>
        </div>
      )}

      {!error && !selectedAccess && accessData.length === 0 && (
        <p className="text-gray-500">
          Cargando datos de acceso o no hay accesos disponibles.
        </p>
      )}
    </div>
  );
}
