// src/context/UserContext.jsx
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();
export default UserContext;

export function UserProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar información del usuario desde sessionStorage al inicializar
        const stored = sessionStorage.getItem("user_info");
        const token = sessionStorage.getItem("token");

        if (stored && token) {
            try {
                const userData = JSON.parse(stored);
                setUserInfo(userData);
            } catch (error) {
                console.error("Error parsing user data:", error);
                // Si hay error, limpiar datos corruptos
                sessionStorage.removeItem("user_info");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("access_data");
                sessionStorage.removeItem("selected_access");
            }
        }

        setLoading(false);
    }, []);

    const login = (user) => {
        setUserInfo(user);
        sessionStorage.setItem("user_info", JSON.stringify(user));

        // Guardar los accesos y el seleccionado
        if (user.userAccesses && Array.isArray(user.userAccesses)) {
            sessionStorage.setItem("access_data", JSON.stringify(user.userAccesses));

            if (user.userAccesses.length > 0) {
                // Seleccionar el primer acceso por defecto
                sessionStorage.setItem(
                    "selected_access",
                    JSON.stringify(user.userAccesses[0])
                );
            } else {
                sessionStorage.removeItem("selected_access");
            }
        } else {
            sessionStorage.removeItem("access_data");
            sessionStorage.removeItem("selected_access");
        }
    };

    const logout = async () => {
        try {
            // Intentar hacer logout en el servidor
            const token = sessionStorage.getItem("token");
            if (token) {
                await fetch("http://127.0.0.1:8000/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }).catch(() => {
                    // Si falla el logout del servidor, continuar con el logout local
                    console.warn("No se pudo notificar al servidor del logout");
                });
            }
        } finally {
            // Siempre limpiar el estado local
            setUserInfo(null);
            sessionStorage.removeItem("user_info");
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("access_data");
            sessionStorage.removeItem("selected_access");
            sessionStorage.removeItem("redirectAfterLogin");
        }
    };

    const updateSelectedAccess = (access) => {
        if (access) {
            sessionStorage.setItem("selected_access", JSON.stringify(access));
        } else {
            sessionStorage.removeItem("selected_access");
        }
    };

    const getSelectedAccess = () => {
        try {
            const stored = sessionStorage.getItem("selected_access");
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Error parsing selected access:", error);
            return null;
        }
    };

    const getAccessData = () => {
        try {
            const stored = sessionStorage.getItem("access_data");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error parsing access data:", error);
            return [];
        }
    };

    const isAuthenticated = () => {
        return !!sessionStorage.getItem("token") && !!userInfo;
    };

    const contextValue = {
        userInfo,
        loading,
        login,
        logout,
        updateSelectedAccess,
        getSelectedAccess,
        getAccessData,
        isAuthenticated,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}
