// src/components/Header.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthHelper } from "../utils/authHelper";

export default function Header({ userInfo, selectedAccess, onChange, onLogout }) {
    const navigate = useNavigate();
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
            if (accessDropdownRef.current && !accessDropdownRef.current.contains(event.target)) {
                setShowAccessDropdown(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Ir al dashboard principal
    const goToHome = () => {
        navigate('/dashboard');
    };

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
    const displayCompany = currentAccess.Company || currentAccess.companyName || "Sin seleccionar";
    const displayBranch = currentAccess.Branch || currentAccess.branchName || "Sin seleccionar";
    const displayRole = currentAccess.Role || currentAccess.roleName || "Sin seleccionar";

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                    {/* Lado izquierdo: Home + Selector de Acceso */}
                    <div className="flex items-center space-x-4">
                        {/* Botón Home */}
                        <button
                            onClick={goToHome}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            title="Ir al Dashboard Principal"
                        >
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Dashboard
                        </button>

                        {/* Selector de Empresa/Sucursal/Rol */}
                        <div className="relative" ref={accessDropdownRef}>
                            <button
                                onClick={() => setShowAccessDropdown(!showAccessDropdown)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                <div className="text-left">
                                    <div className="text-xs text-gray-500">Empresa • Sucursal • Rol</div>
                                    <div className="font-medium">
                                        {displayCompany} • {displayBranch} • {displayRole}
                                    </div>
                                </div>
                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown de accesos */}
                            {showAccessDropdown && userAccesses.length > 0 && (
                                <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1 max-h-80 overflow-y-auto">
                                        <div className="px-4 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                                            Seleccionar Acceso
                                        </div>
                                        {userAccesses.map((access, index) => {
                                            const company = access.Company || access.companyName || "Sin empresa";
                                            const branch = access.Branch || access.branchName || "Sin sucursal";
                                            const role = access.Role || access.roleName || "Sin rol";
                                            const isSelected = company === displayCompany &&
                                                branch === displayBranch &&
                                                role === displayRole;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAccessChange(access)}
                                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors duration-150 ${isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                                                        }`}
                                                >
                                                    <div className="font-medium">{company}</div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {branch} • {role}
                                                    </div>
                                                    {isSelected && (
                                                        <div className="flex items-center mt-1">
                                                            <svg className="h-3 w-3 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                            <span className="text-xs text-blue-600 font-medium">Activo</span>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Lado derecho: Info de usuario */}
                    <div className="flex items-center space-x-4">
                        {/* Información de usuario y logout */}
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-3">
                                    {/* Avatar */}
                                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-sm font-medium text-white">
                                            {userInfo?.Nickname ? userInfo.Nickname.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    {/* Info de usuario */}
                                    <div className="text-left hidden sm:block">
                                        <div className="font-medium text-gray-900">
                                            {userInfo?.Fullname || userInfo?.Nickname || 'Usuario'}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {displayRole}
                                        </div>
                                    </div>
                                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            {/* Dropdown de usuario */}
                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                    <div className="py-1">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <div className="font-medium text-gray-900">
                                                {userInfo?.Fullname || userInfo?.Nickname || 'Usuario'}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {userInfo?.Nickname && userInfo?.Fullname ? `@${userInfo.Nickname}` : ''}
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center transition-colors duration-150"
                                        >
                                            <svg className="h-4 w-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}