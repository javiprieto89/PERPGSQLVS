import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import RedirectHome from "./components/RedirectHome";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Suppliers from "./pages/Suppliers";
import Documents from "./pages/Documents";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import LogoutSuccess from "./pages/LogoutSuccess";

import { UserProvider } from "./context/UserContext";

export default function App() {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Cargar información del usuario desde sessionStorage
        const saved = sessionStorage.getItem("user_info");
        if (saved) {
            try {
                setUserInfo(JSON.parse(saved));
            } catch (error) {
                console.error("Error parsing user info:", error);
                // Si hay error, limpiar datos corruptos
                sessionStorage.removeItem("user_info");
                sessionStorage.removeItem("token");
            }
        }

        // Configurar ID único para esta pestaña
        const tabId = Date.now().toString();
        window.name = tabId;

        // Registrar esta pestaña en la lista de pestañas abiertas
        const existing = sessionStorage.getItem("open_tabs");
        const parsedTabs = existing ? JSON.parse(existing) : [];
        parsedTabs.push(tabId);
        sessionStorage.setItem("open_tabs", JSON.stringify(parsedTabs));

        // Manejar cierre de pestaña/ventana
        const handleBeforeUnload = () => {
            const tabs = sessionStorage.getItem("open_tabs");
            if (tabs) {
                const parsedTabs = JSON.parse(tabs);
                const updatedTabs = parsedTabs.filter((t) => t !== window.name);
                sessionStorage.setItem("open_tabs", JSON.stringify(updatedTabs));

                // Si es la última pestaña, hacer logout completo
                if (updatedTabs.length === 0) {
                    const token = sessionStorage.getItem("token");
                    if (token) {
                        // Intentar notificar al servidor del logout
                        fetch("http://127.0.0.1:8000/logout", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }).catch(() => {
                            // Si falla, continuar con la limpieza local
                        });
                    }
                    // Limpiar todo el sessionStorage
                    sessionStorage.clear();
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        // Cleanup
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <UserProvider>
            <Routes>
                {/* Login sin layout */}
                <Route
                    path="/login"
                    element={
                        <Login
                            onLogin={() => {
                                const saved = sessionStorage.getItem("user_info");
                                if (saved) {
                                    setUserInfo(JSON.parse(saved));
                                }
                            }}
                        />
                    }
                />

                {/* Pantalla de logout */}
                <Route path="/logout" element={<LogoutSuccess />} />

                {/* Redirecciona según sesión */}
                <Route path="/" element={<RedirectHome />} />

                {/* Rutas protegidas con layout */}
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout userInfo={userInfo} setUserInfo={setUserInfo} />
                        </RequireAuth>
                    }
                >
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="suppliers" element={<Suppliers />} />
                    <Route path="documents" element={<Documents />} />

                    {/* Ruta por defecto dentro del layout */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
            </Routes>
        </UserProvider>
    );
}