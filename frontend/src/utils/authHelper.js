// utils/authHelper.js
import { graphqlClient } from './graphqlClient';
import React from 'react';

// Consultas de autenticación
export const AUTH_QUERIES = {
    LOGIN: `
        mutation Login($input: LoginInput!) {
            login(input: $input) {
                success
                message
                token
                user {
                    UserID
                    Nickname
                    FullName
                    IsActive
                    UserAccess {
                        UserID
                        CompanyID
                        Company
                        BranchID
                        Branch
                        RoleID
                        Role
                    }
                }
            }
        }
    `,

    ME: `
        query Me {
            me {
                UserID
                Nickname
                FullName
                IsActive
                UserAccess {
                    UserID
                    CompanyID
                    Company
                    BranchID
                    Branch
                    RoleID
                    Role
                }
            }
        }
    `
};

export class AuthHelper {
    static TOKEN_KEY = 'token';
    static USER_KEY = 'user_data';
    static ACCESS_KEY = 'access_data';
    static SELECTED_ACCESS_KEY = 'selected_access';

    // Función de login
    static async login(nickname, password) {
        try {
            const response = await graphqlClient.mutation(AUTH_QUERIES.LOGIN, {
                input: { nickname, password }
            });

            if (response.login.success) {
                // Guardar token
                sessionStorage.setItem(this.TOKEN_KEY, response.login.token);

                // Guardar datos del usuario
                const userData = response.login.user;
                sessionStorage.setItem(this.USER_KEY, JSON.stringify(userData));

                // Guardar accesos del usuario
                if (userData.UserAccess && userData.UserAccess.length > 0) {
                    // Normalizar accesos antes de guardar
                    const normalizedAccesses = userData.UserAccess.map(access => this.normalizeAccess(access));
                    sessionStorage.setItem(this.ACCESS_KEY, JSON.stringify(normalizedAccesses));

                    // Si solo tiene un acceso, seleccionarlo automáticamente
                    if (userData.UserAccess.length === 1) {
                        this.setSelectedAccess(normalizedAccesses[0]);
                    } else {
                        // Si tiene múltiples accesos, seleccionar el primero como predeterminado
                        this.setSelectedAccess(normalizedAccesses[0]);
                    }
                }

                return {
                    success: true,
                    user: userData,
                    message: response.login.message
                };
            } else {
                return {
                    success: false,
                    message: response.login.message
                };
            }
        } catch (error) {
            console.error('Error en login:', error);
            return {
                success: false,
                message: error.message || 'Error de conexión'
            };
        }
    }

    // Función de logout
    static logout() {
        sessionStorage.removeItem(this.TOKEN_KEY);
        sessionStorage.removeItem(this.USER_KEY);
        sessionStorage.removeItem(this.ACCESS_KEY);
        sessionStorage.removeItem(this.SELECTED_ACCESS_KEY);

        // Redirigir al login
        window.location.href = '/login';
    }

    // Verificar si el usuario está autenticado
    static isAuthenticated() {
        return !!sessionStorage.getItem(this.TOKEN_KEY);
    }

    // Obtener token
    static getToken() {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    // Obtener datos del usuario
    static getUserData() {
        const userData = sessionStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    // Obtener accesos del usuario
    static getUserAccess() {
        const accessData = sessionStorage.getItem(this.ACCESS_KEY);
        if (accessData) {
            const accesses = JSON.parse(accessData);
            // Asegurar que todos los accesos estén normalizados
            return accesses.map(access => this.normalizeAccess(access));
        }
        return [];
    }

    // Obtener acceso seleccionado - CORREGIDO
    static getSelectedAccess() {
        const selectedAccess = sessionStorage.getItem(this.SELECTED_ACCESS_KEY);
        if (selectedAccess) {
            try {
                const access = JSON.parse(selectedAccess);
                return this.normalizeAccess(access);
            } catch (error) {
                console.error('Error parsing selected access:', error);
                // Si hay error, intentar recuperar el primer acceso disponible
                const userAccesses = this.getUserAccess();
                if (userAccesses.length > 0) {
                    this.setSelectedAccess(userAccesses[0]);
                    return userAccesses[0];
                }
            }
        }

        // Si no hay acceso seleccionado, intentar usar el primer acceso disponible
        const userAccesses = this.getUserAccess();
        if (userAccesses.length > 0) {
            const firstAccess = userAccesses[0];
            this.setSelectedAccess(firstAccess);
            return firstAccess;
        }

        return null;
    }

    // Establecer acceso seleccionado - MEJORADO
    static setSelectedAccess(access) {
        if (!access) {
            console.warn('Intentando establecer un acceso nulo');
            return;
        }

        const normalizedAccess = this.normalizeAccess(access);
        sessionStorage.setItem(this.SELECTED_ACCESS_KEY, JSON.stringify(normalizedAccess));

        console.log('Acceso seleccionado establecido:', normalizedAccess);

        // Disparar evento personalizado para que otros componentes se actualicen
        window.dispatchEvent(new CustomEvent('accessChanged', {
            detail: normalizedAccess
        }));
    }

    // Normalizar datos de acceso - MEJORADO
    static normalizeAccess(access) {
        if (!access) {
            return null;
        }

        // Manejar diferentes formatos de datos de acceso
        const userID = access.UserID || access.userID || null;
        const companyID = access.CompanyID || access.companyID || null;
        const branchID = access.BranchID || access.branchID || null;
        const roleID = access.RoleID || access.roleID || null;

        // Para los nombres, usar valores predeterminados más informativos
        const companyName = access.Company || access.companyName || (companyID ? `Empresa ${companyID}` : 'Sin empresa');
        const branchName = access.Branch || access.branchName || (branchID ? `Sucursal ${branchID}` : 'Sin sucursal');
        const roleName = access.Role || access.roleName || (roleID ? `Rol ${roleID}` : 'Sin rol');

        return {
            UserID: userID,
            CompanyID: companyID,
            Company: companyName,
            BranchID: branchID,
            Branch: branchName,
            RoleID: roleID,
            Role: roleName,

            // Mantener también las propiedades originales para compatibilidad
            userID: userID,
            companyID: companyID,
            companyName: companyName,
            branchID: branchID,
            branchName: branchName,
            roleID: roleID,
            roleName: roleName
        };
    }

    // Obtener información completa del usuario para el Header
    static getUserInfoForHeader() {
        const userData = this.getUserData();
        const userAccess = this.getUserAccess();
        const selectedAccess = this.getSelectedAccess();

        if (!userData) return null;

        return {
            ...userData,
            UserAccess: userAccess,
            selectedAccess: selectedAccess
        };
    }

    // Verificar permisos del usuario actual
    static hasPermission(requiredRole) {
        const selectedAccess = this.getSelectedAccess();
        if (!selectedAccess) return false;

        const currentRole = selectedAccess.Role || selectedAccess.roleName;
        // Aquí puedes implementar lógica más compleja de permisos
        return currentRole === requiredRole;
    }

    // Verificar si el usuario pertenece a una empresa específica
    static belongsToCompany(companyId) {
        const userAccess = this.getUserAccess();
        return userAccess.some(access =>
            (access.CompanyID || access.companyID) === companyId
        );
    }

    // Verificar si el usuario pertenece a una sucursal específica
    static belongsToBranch(branchId) {
        const userAccess = this.getUserAccess();
        return userAccess.some(access =>
            (access.BranchID || access.branchID) === branchId
        );
    }

    // Obtener todas las empresas a las que tiene acceso el usuario
    static getUserCompanies() {
        const userAccess = this.getUserAccess();
        const companies = new Map();

        userAccess.forEach(access => {
            const companyId = access.CompanyID || access.companyID;
            const companyName = access.Company || access.companyName;

            if (companyId && !companies.has(companyId)) {
                companies.set(companyId, {
                    id: companyId,
                    name: companyName
                });
            }
        });

        return Array.from(companies.values());
    }

    // Obtener todas las sucursales de una empresa específica
    static getBranchesForCompany(companyId) {
        const userAccess = this.getUserAccess();
        const branches = new Map();

        userAccess
            .filter(access => (access.CompanyID || access.companyID) === companyId)
            .forEach(access => {
                const branchId = access.BranchID || access.branchID;
                const branchName = access.Branch || access.branchName;

                if (branchId && !branches.has(branchId)) {
                    branches.set(branchId, {
                        id: branchId,
                        name: branchName
                    });
                }
            });

        return Array.from(branches.values());
    }

    // Método para debugging - NUEVO
    static debugAuthState() {
        console.log('=== DEBUG AUTH STATE ===');
        console.log('Token exists:', !!this.getToken());
        console.log('User data:', this.getUserData());
        console.log('User access:', this.getUserAccess());
        console.log('Selected access:', this.getSelectedAccess());
        console.log('========================');
    }
}

// Hook personalizado para React (opcional)
export const useAuth = () => {
    const [user] = React.useState(AuthHelper.getUserData());
    const [selectedAccess, setSelectedAccess] = React.useState(AuthHelper.getSelectedAccess());

    React.useEffect(() => {
        const handleAccessChange = (event) => {
            setSelectedAccess(event.detail);
        };

        window.addEventListener('accessChanged', handleAccessChange);
        return () => window.removeEventListener('accessChanged', handleAccessChange);
    }, []);

    const selectAccess = (access) => {
        AuthHelper.setSelectedAccess(access);
        setSelectedAccess(access);
    };

    return {
        user,
        selectedAccess,
        selectAccess,
        logout: AuthHelper.logout,
        isAuthenticated: AuthHelper.isAuthenticated(),
        userAccess: AuthHelper.getUserAccess()
    };
};