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
    const [accessData, setAccessData] = useState([]);
    const [internalSelectedAccess, setInternalSelectedAccess] = useState({
        company: "",
        branch: "",
        Role: "",
    });

    // Carga inicial: accesos y selección guardados en sessionStorage
    useEffect(() => {
        // Usar AuthHelper para obtener datos actualizados
        const authUserAccess = AuthHelper.getUserAccess();
        const authSelectedAccess = AuthHelper.getSelectedAccess();

        if (authUserAccess.length > 0) {
            setAccessData(authUserAccess);
        } else {
            // Fallback al método anterior
            const storedAccessData = sessionStorage.getItem("access_data");
            if (storedAccessData) {
                setAccessData(JSON.parse(storedAccessData));
            }
        }

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

    // Cambio de empresa/sucursal/rol
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newSel = { ...internalSelectedAccess, [name]: value };
        setInternalSelectedAccess(newSel);
        sessionStorage.setItem("selected_access", JSON.stringify(newSel));

        // Si hay una función de cambio de acceso del parent, usarla
        if (onAccessChange) {
            // Encontrar el acceso completo que coincida con la selección
            const matchingAccess = accessData.find(access => {
                const companyName = access.Company || access.companyName;
                const branchName = access.Branch || access.branchName;
                const roleName = access.Role || access.roleName;

                return companyName === newSel.company &&
                    branchName === newSel.branch &&
                    roleName === newSel.Role;
            });

            if (matchingAccess) {
                onAccessChange(matchingAccess);
            }
        }
    };

    // Funciones para ventanas flotantes
    const closeWindow = (id) => {
        setWindows((wins) => wins.filter((w) => w.id !== id));
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar y cabecera */}
            <Sidebar
                userInfo={userInfo}
                accessData={accessData}
                selectedAccess={internalSelectedAccess}
                onChangeAccess={handleChange}
                onLogout={handleLogout}
            />
            <div className="flex-1 flex flex-col">
                <Header
                    userInfo={userInfo}
                    selectedAccess={selectedAccess}
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