// utils/authHelper.js

import z from "zod";

export type UserAccess = {
  UserID: number;
  CompanyID: number;
  Company: string;
  BranchID: number;
  Branch: string;
  RoleID: number;
  Role: string;
};

// original From DB
export type UserData = {
  UserID: number;
  Nickname: string;
  FullName?: string | null;
  IsActive: boolean;
  UserAccess: UserAccess[];
};

export class AuthHelper {
  static TOKEN_KEY = "token";
  static USER_KEY = "user_data";
  static SELECTED_ACCESS_KEY = "selected_access";
  static ACCESS_KEY = "access_data";
  static REDIRECT_AFTER_LOGIN_KEY = "redirectAfterLogin";

  static setToken(token: string | null | undefined) {
    try {
      if (!token) throw new Error("Login response not defined");

      // Cookie válida solo para la sesión del navegador
      document.cookie = `${this.TOKEN_KEY}=${encodeURIComponent(
        token
      )}; path=/`;

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en saveToken:", message);
      return false;
    }
  }

  // Obtener token de las cookies
  static getToken() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) =>
      row.startsWith(`${this.TOKEN_KEY}=`)
    );
    return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
  }

  // Eliminar token
  static deleteToken() {
    document.cookie = `${this.TOKEN_KEY}=; path=/; max-age=0`;
  }

  static setTokenSession(token: string | null | undefined) {
    try {
      if (!token) throw new Error("Login response not defined");

      sessionStorage.setItem(this.TOKEN_KEY, token);

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en saveToken:", message);
      return false;
    }
  }

  // Obtener token
  static getTokenSession() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Función de login
  static setUserData(user: UserData) {
    try {
      if (!user) throw new Error("Login response not defined");

      // Guardar datos del usuario
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en saveUserData:", message);
      return false;
    }
  }

  // Obtener datos del usuario
  // TODO: verificar que tipo de estructura TS tiene getUserData
  static getUserData() {
    const userData = sessionStorage.getItem(this.USER_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    return userData ? (JSON.parse(userData) as UserData) : null;
  }

  // Establecer acceso seleccionado
  static setSelectedAccess(access: UserAccess | undefined) {
    try {
      if (!access) throw new Error("Intentando establecer un acceso nulo");

      // sessionStorage.setItem(this.SELECTED_ACCESS_KEY, JSON.stringify(access));
      localStorage.setItem(this.SELECTED_ACCESS_KEY, JSON.stringify(access));

      // Disparar evento personalizado para que otros componentes se actualicen
      console.log("Acceso seleccionado establecido:", access);
      window.dispatchEvent(
        new CustomEvent("accessChanged", {
          detail: access,
        })
      );

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en setSelectedAccess:", message);
      if (sessionStorage.getItem(this.SELECTED_ACCESS_KEY))
        sessionStorage.removeItem(this.SELECTED_ACCESS_KEY);

      return false;
    }
  }

  // Obtener acceso seleccionado - CORREGIDO
  static getSelectedAccess(): UserAccess | null {
    try {
      // const selectedAccess = sessionStorage.getItem(this.SELECTED_ACCESS_KEY);
      const selectedAccess = localStorage.getItem(this.SELECTED_ACCESS_KEY);
      if (!selectedAccess) throw new Error("Not found");
      return JSON.parse(selectedAccess) as UserAccess;
    } catch (error) {
      // Si no hay acceso seleccionado, intentar usar el primer acceso disponible
      const userAccesses = this.getAccesses();
      if (userAccesses) {
        this.setSelectedAccess(userAccesses[0]);
        return userAccesses[0];
      } else {
        return null;
      }
    }
  }

  static removeSelectedAccess() {
    sessionStorage.removeItem(this.SELECTED_ACCESS_KEY);
    localStorage.removeItem(this.SELECTED_ACCESS_KEY);
  }

  static setAccesses(accesses: UserAccess[] | undefined) {
    try {
      if (!accesses) throw new Error("Intentando establecer un acceso nulo");
      // Guardar accesos del usuario
      // sessionStorage.setItem(this.ACCESS_KEY, JSON.stringify(accesses || []));
      localStorage.setItem(this.ACCESS_KEY, JSON.stringify(accesses || []));
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en setAccesses:", message);
      return false;
    }
  }

  // Obtener accesos del usuario
  static getAccesses() {
    // const accessData = sessionStorage.getItem(this.ACCESS_KEY);
    const accessData = localStorage.getItem(this.ACCESS_KEY);
    if (accessData) {
      // Asegurar que todos los accesos estén normalizados
      return JSON.parse(accessData) as UserAccess[];
    }
    return null;
  }

  // Obtener accesos del usuario
  static removeAccesses() {
    localStorage.removeItem(this.ACCESS_KEY);
  }

  static setRedirectAfterLogin(url: string | undefined) {
    try {
      if (!url || !z.url().parse(url)) return undefined;
      sessionStorage.setItem(this.REDIRECT_AFTER_LOGIN_KEY, String(url));
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error in redirect:", message);
      return false;
    }
  }

  static getRedirectAfterLogin() {
    try {
      return sessionStorage.getItem(this.REDIRECT_AFTER_LOGIN_KEY) || "/";
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error getting redirect", message);
      return "/";
    }
  }

  static removeRedirectAfterLogin() {
    sessionStorage.removeItem(this.REDIRECT_AFTER_LOGIN_KEY);
  }

  // Verificar si el usuario está autenticado
  static isAuthenticated() {
    return !!this.getToken();
  }

  // Obtener información completa del usuario para el Header
  static getUserInfoForHeader() {
    const userData = this.getUserData();

    if (!userData) return null;

    return {
      ...userData,
      UserAccess: this.getAccesses(),
      selectedAccess: this.getSelectedAccess(),
    };
  }

  // Verificar permisos del usuario actual
  static hasPermission(requiredRole: string) {
    const selectedAccess = this.getSelectedAccess();
    if (!selectedAccess) return false;

    // Aquí puedes implementar lógica más compleja de permisos
    return selectedAccess.Role === requiredRole;
  }

  // Verificar si el usuario pertenece a una empresa específica
  static belongsToCompany(companyId: number) {
    const userAccess = this.getAccesses();
    if (!userAccess) return [];
    return userAccess.some((access: any) => access.CompanyID === companyId);
  }

  // Verificar si el usuario pertenece a una sucursal específica
  static belongsToBranch(branchId: number) {
    const userAccess = this.getAccesses();
    if (!userAccess) return [];
    return userAccess.some((access: any) => access.BranchID === branchId);
  }

  // Obtener todas las empresas a las que tiene acceso el usuario
  static getUserCompanies() {
    const userAccess = this.getAccesses();
    if (!userAccess) return [];

    const companies = new Map<
      string,
      { id: UserAccess["CompanyID"]; name: UserAccess["Company"] }
    >();

    userAccess.forEach((access) => {
      if (access.CompanyID && !companies.has(String(access.CompanyID))) {
        companies.set(String(access.CompanyID), {
          id: access.CompanyID,
          name: access.Company,
        });
      }
    });

    return Array.from(companies.values());
  }

  // Obtener todas las sucursales de una empresa específica
  static getBranchesForCompany(companyId: number) {
    const userAccess = this.getAccesses();
    if (!userAccess) return [];

    const branches = new Map();

    userAccess
      .filter((access: any) => access.CompanyID === companyId)
      .forEach((access: any) => {
        if (access.BranchID && !branches.has(access.BranchID)) {
          branches.set(access.BranchID, {
            id: access.BranchID,
            name: access.Branch,
          });
        }
      });

    return Array.from(branches.values());
  }

  static logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.ACCESS_KEY);
    sessionStorage.removeItem(this.SELECTED_ACCESS_KEY);
    sessionStorage.removeItem(this.REDIRECT_AFTER_LOGIN_KEY);
    this.deleteToken();
    // Limpiar todo el sessionStorage
    // sessionStorage.clear();
  }

  // Método para debugging - NUEVO
  static debugAuthState() {
    console.log("=== DEBUG AUTH STATE ===");
    console.log("Token exists:", !!this.getToken());
    console.log("User data:", this.getUserData());
    console.log("User access:", this.getAccesses());
    console.log("Selected access:", this.getSelectedAccess());
    console.log("========================");
  }
}
