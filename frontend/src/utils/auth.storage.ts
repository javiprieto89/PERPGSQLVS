import type {
  UserInfo,
  UserPermissionsInfo,
} from "~/graphql/_generated/graphql";

export class AuthStorage {
  static TOKEN_KEY = "token";
  static USER_KEY = "user_data";
  static SELECTED_ACCESS_KEY = "selected_access";
  static ACCESS_KEY = "access_data";
  static REFRESH_TOKEN = "refresh_token";

  static setTokenCookie(token: string | null | undefined) {
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
  static getTokenCookie() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) =>
      row.startsWith(`${this.TOKEN_KEY}=`)
    );
    return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
  }

  // Eliminar token
  static deleteTokenCookie() {
    document.cookie = `${this.TOKEN_KEY}=; path=/; max-age=0`;
  }

  static setToken(token: string | null | undefined) {
    try {
      if (!token) throw new Error("Login response not defined");

      localStorage.setItem(this.TOKEN_KEY, token);

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en saveToken:", message);
      return false;
    }
  }

  // Obtener token
  static getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static deleteToken() {
    return localStorage.removeItem(this.TOKEN_KEY);
  }

  static setRefreshToken(token: string | null | undefined) {
    try {
      if (!token) throw new Error("Login response not defined");

      localStorage.setItem(this.REFRESH_TOKEN, token);

      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Session Error:", message);
      return false;
    }
  }

  // Obtener token
  static getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  static deleteRefreshToken() {
    return localStorage.removeItem(this.REFRESH_TOKEN);
  }

  // Función de login
  static setUserData(user: UserInfo) {
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
  static getUserData() {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? (JSON.parse(userData) as UserInfo) : null;
  }

  static deleteUserData() {
    localStorage.removeItem(this.USER_KEY);
  }

  // Establecer acceso seleccionado
  static setSelectedAccess(access: UserPermissionsInfo | undefined) {
    try {
      if (!access) throw new Error("Intentando establecer un acceso nulo");

      localStorage.setItem(this.SELECTED_ACCESS_KEY, JSON.stringify(access));

      // Disparar evento personalizado para que otros componentes se actualicen
      window.dispatchEvent(
        new CustomEvent("accessChanged", {
          detail: access,
        })
      );

      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en setSelectedAccess:", message);
      if (localStorage.getItem(this.SELECTED_ACCESS_KEY))
        localStorage.removeItem(this.SELECTED_ACCESS_KEY);

      return false;
    }
  }

  // Obtener acceso seleccionado - CORREGIDO
  static getSelectedAccess(): UserPermissionsInfo | null {
    try {
      const selectedAccess = localStorage.getItem(this.SELECTED_ACCESS_KEY);
      if (!selectedAccess) throw new Error("Not found");
      return JSON.parse(selectedAccess) as UserPermissionsInfo;
    } catch (error) {
      console.error((error as Error).message);
      // Si no hay acceso seleccionado, intentar usar el primer acceso disponible
      const userAccesses = this.getPermissions();
      if (userAccesses) {
        this.setSelectedAccess(userAccesses[0]);
        return userAccesses[0];
      } else {
        return null;
      }
    }
  }

  static deleteSelectedAccess() {
    localStorage.removeItem(this.SELECTED_ACCESS_KEY);
  }

  static setAccesses(accesses: UserPermissionsInfo[] | undefined) {
    try {
      if (!accesses) throw new Error("Intentando establecer un acceso nulo");
      // Guardar accesos del usuario
      localStorage.setItem(this.ACCESS_KEY, JSON.stringify(accesses || []));
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error("Error en setAccesses:", message);
      return false;
    }
  }

  // Obtener accesos del usuario
  static getPermissions() {
    const accessData = localStorage.getItem(this.ACCESS_KEY);
    if (accessData) {
      // Asegurar que todos los accesos estén normalizados
      return JSON.parse(accessData) as UserPermissionsInfo[];
    }
    return null;
  }

  // Obtener accesos del usuario
  static deleteAccesses() {
    localStorage.removeItem(this.ACCESS_KEY);
  }

  // Verificar si el usuario está autenticado
  static hasToken() {
    return !!this.getToken();
  }

  // Obtener información completa del usuario para el Header
  static getUserInfoForHeader() {
    const userData = this.getUserData();

    if (!userData) return null;

    return {
      ...userData,
      UserPermissions: this.getPermissions(),
      selectedAccess: this.getSelectedAccess(),
    };
  }

  // Verificar permisos del usuario actual
  static hasPermission(requiredRole: string) {
    const selectedAccess = this.getSelectedAccess();
    if (!selectedAccess) return false;

    // Aquí puedes implementar lógica más compleja de permisos
    return selectedAccess.RoleName === requiredRole;
  }

  // Verificar si el usuario pertenece a una empresa específica
  static belongsToCompany(companyId: number) {
    const userAccess = this.getPermissions();
    if (!userAccess) return [];
    return userAccess.some((access: any) => access.CompanyID === companyId);
  }

  // Verificar si el usuario pertenece a una sucursal específica
  static belongsToBranch(branchId: number) {
    const userAccess = this.getPermissions();
    if (!userAccess) return [];
    return userAccess.some((access: any) => access.BranchID === branchId);
  }

  // Obtener todas las empresas a las que tiene acceso el usuario
  static getUserCompanies() {
    const userAccess = this.getPermissions();
    if (!userAccess) return [];

    const companies = new Map<
      string,
      {
        id: UserPermissionsInfo["CompanyID"];
        name: UserPermissionsInfo["CompanyName"];
      }
    >();

    userAccess.forEach((access) => {
      if (access.CompanyID && !companies.has(String(access.CompanyID))) {
        companies.set(String(access.CompanyID), {
          id: access.CompanyID,
          name: access.CompanyName,
        });
      }
    });

    return Array.from(companies.values());
  }

  // Obtener todas las sucursales de una empresa específica
  static getBranchesForCompany(companyId: number) {
    const userAccess = this.getPermissions();
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
    this.deleteUserData();
    this.deleteRefreshToken();
    this.deleteAccesses();
    this.deleteSelectedAccess();
    this.deleteToken();
  }

  // Método para debugging - NUEVO
  static debugAuthState() {
    console.log("=== DEBUG AUTH STATE ===");
    console.log("Token exists:", !!this.getToken());
    console.log("User data:", this.getUserData());
    console.log("User access:", this.getPermissions());
    console.log("Selected access:", this.getSelectedAccess());
    console.log("========================");
  }
}
