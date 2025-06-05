// src/context/UserContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user_info");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
    // No necesitas cargar access_data o selected_access aquí directamente en el estado,
    // ya que Login.jsx se encargará de pasarlo a UserContext y Layout/Dashboard lo leerán de localStorage.
  }, []);

  const login = (user) => {
    setUserInfo(user);
    localStorage.setItem("user_info", JSON.stringify(user));

    // --- CORRECCIÓN CRÍTICA AQUÍ: Guardar los accesos y el seleccionado ---
    if (user.userAccesses) {
      localStorage.setItem("access_data", JSON.stringify(user.userAccesses));
      if (user.userAccesses.length > 0) {
        localStorage.setItem(
          "selected_access",
          JSON.stringify(user.userAccesses[0])
        );
      } else {
        localStorage.removeItem("selected_access"); // Si no hay accesos, limpiar
      }
    } else {
      localStorage.removeItem("access_data");
      localStorage.removeItem("selected_access");
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("user_info");
    localStorage.removeItem("token");
    localStorage.removeItem("access_data");
    localStorage.removeItem("selected_access");
  };

  return (
    <UserContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
