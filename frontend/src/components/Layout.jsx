// src/components/Layout.jsx
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RenderInWindow from "./RenderInWindow";
import { AuthHelper } from "../utils/authHelper";

export default function Layout({
    userInfo,
    setUserInfo,
    selectedAccess,
    onAccessChange,
    onLogout
}) {
    const navigate = useNavigate();
    // Ventanas flotantes
    const [windows, setWindows] = useState([]);

    // Estado interno para compatibilidad con el código existente
    const [internalSelectedAccess, setInternalSelectedAccess] = useState({
        company: "",
        branch: "",
        Role: "",
    });

    // Carga inicial: accesos y selección guardados en sessionStorage
    useEffect(() => {
        // Usar AuthHelper para obtener datos actualizados
        const authSelectedAccess = AuthHelper.getSelectedAccess();

        if (authSelectedAccess) {
            setInternalSelectedAccess({
                company: authSelectedAccess.Company || authSelectedAccess.companyName || "",
                branch: authSelectedAccess.Branch || authSelectedAccess.branchName || "",
                Role: authSelectedAccess.Role || authSelectedAccess.roleName || "",
            });
        } else {
            // Fallback al método anterior
            const storedSelected = sessionStorage.getItem("selected_access");
            if (storedSelected) {
                setInternalSelectedAccess(JSON.parse(storedSelected));
            }
        }
    }, [selectedAccess]);

    // Logout: limpia estado global y local
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        } else {
            // Fallback al método anterior
            setUserInfo(null);
            sessionStorage.clear();
            navigate("/logout");
        }
    };

    // Funciones para ventanas flotantes
    const closeWindow = (id) => {
        setWindows((wins) => wins.filter((w) => w.id !== id));
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar y cabecera */}
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header
                    userInfo={userInfo}
                    selectedAccess={internalSelectedAccess}
                    onChange={onAccessChange}
                    onLogout={handleLogout}
                />
                <main className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
                    {/* Aquí se inyectan las rutas hijas */}
                    <Outlet />
                </main>

                {/* Ventanas emergentes */}
                {windows.map((window) => {
                    const WindowComponent = window.Component;
                    return (
                        <RenderInWindow
                            key={window.id}
                            title={window.title}
                            onClose={() => closeWindow(window.id)}
                            {...window.options}
                        >
                            <WindowComponent />
                        </RenderInWindow>
                    );
                })}
            </div>
        </div>
    );
}