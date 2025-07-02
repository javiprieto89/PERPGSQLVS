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
                    sessionStorage.setItem(this.ACCESS_KEY, JSON.stringify(userData.UserAccess));

                    // Si solo tiene un acceso, seleccionarlo automáticamente
                    if (userData.UserAccess.length === 1) {
                        this.setSelectedAccess(userData.UserAccess[0]);
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
        return accessData ? JSON.parse(accessData) : [];
    }

    // Obtener acceso seleccionado
    static getSelectedAccess() {
        const selectedAccess = sessionStorage.getItem(this.SELECTED_ACCESS_KEY);
        return selectedAccess ? JSON.parse(selectedAccess) : null;
    }

    // Establecer acceso seleccionado
    static setSelectedAccess(access) {
        sessionStorage.setItem(this.SELECTED_ACCESS_KEY, JSON.stringify(access));

        // Disparar evento personalizado para que otros componentes se actualicen
        window.dispatchEvent(new CustomEvent('accessChanged', {
            detail: access
        }));
    }

    // Normalizar datos de acceso (para compatibilidad con diferentes formatos)
    static normalizeAccess(access) {
        return {
            UserID: access.UserID || access.userID,
            CompanyID: access.CompanyID || access.companyID,
            Company: access.Company || access.companyName || `Empresa ${access.CompanyID || access.companyID}`,
            BranchID: access.BranchID || access.branchID,
            Branch: access.Branch || access.branchName || `Sucursal ${access.BranchID || access.branchID}`,
            RoleID: access.RoleID || access.roleID,
            Role: access.Role || access.roleName || `Rol ${access.RoleID || access.roleID}`,

            // Mantener también las propiedades originales para compatibilidad
            companyID: access.CompanyID || access.companyID,
            companyName: access.Company || access.companyName,
            branchID: access.BranchID || access.branchID,
            branchName: access.Branch || access.branchName,
            roleID: access.RoleID || access.roleID,
            roleName: access.Role || access.roleName
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
            UserAccess: userAccess.map(access => this.normalizeAccess(access)),
            selectedAccess: selectedAccess ? this.normalizeAccess(selectedAccess) : null
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

            if (!companies.has(companyId)) {
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

                if (!branches.has(branchId)) {
                    branches.set(branchId, {
                        id: branchId,
                        name: branchName
                    });
                }
            });

        return Array.from(branches.values());
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