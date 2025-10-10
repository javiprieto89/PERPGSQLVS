// src/context/UserContext.jsx
import { type ApolloError } from "@apollo/client";
import { atom, useAtom } from 'jotai';
import { createContext, useContext, useEffect, type PropsWithChildren } from "react";
import { useLoginMutation, type UserInfo, type UserPermissionsInfo } from '~/graphql/_generated/graphql';
import { AuthHelper } from "~/utils/authHelper";

export type AuthContextProps = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  loading: boolean;
  login: (nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getSelectedAccess: () => any;
  selectedAccess: UserPermissionsInfo | null;
  getAccessData: () => UserPermissionsInfo[];
  isAuthenticated: () => boolean;
  changeSelectedAccess: (detail: UserPermissionsInfo) => void;
  userAccesses: UserPermissionsInfo[] | null;
  error: ApolloError | Error | undefined;
}

const UserContext = createContext<AuthContextProps | undefined>(undefined);

const userDataAtom = atom(AuthHelper.getUserData());
const selectedAccessAtom = atom(AuthHelper.getSelectedAccess());
const userAccessesAtom = atom(AuthHelper.getPermissions());

AuthHelper.debugAuthState()

export function UserProvider({ children }: PropsWithChildren) {
  const [mutate, { data, loading, error }] = useLoginMutation();
  const [userData, setUserData] = useAtom(userDataAtom);
  const [selectedAccess, setSelectedAccess] = useAtom(selectedAccessAtom);
  const [userPermissions, setUserPermissions] = useAtom(userAccessesAtom);

  console.log("RESPONSE data", data);

  const user = data?.login?.user;
  const success = data?.login?.success || false;
  const message = data?.login?.message;
  const loginError = !success && message ? new Error(message) : undefined

  const login = async (nickname: string, password: string) => {
    await mutate({ variables: { input: { nickname, password } } });
  };

  const logout = async () => {
    try {
      AuthHelper.logout();
      // TODO: Backend needs to catchup the current session and turn it down
      // await fetch(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).catch(() => {
      //   // Si falla el logout del servidor, continuar con el logout local
      //   console.warn("No se pudo notificar al servidor del logout");
      // });
    } finally {
      // Siempre limpiar el estado local
      setUserData(null);
      setSelectedAccess(null);
      setUserPermissions([]);
      window.location.href = "/";
    }
  };

  // Manejar cambio de acceso
  const changeSelectedAccess = (detail: UserPermissionsInfo) => {
    console.log("LOG--changeSelectedAccess", detail);
    // event.detail
    AuthHelper.setSelectedAccess(detail);
    setSelectedAccess(detail);
    // setUserAccesses(detail);
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
      return AuthHelper.getPermissions() || [];
      // const stored = sessionStorage.getItem("access_data");
      // return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing access data:", error);
      return [];
    }
  };

  const isAuthenticated = () => {
    return !!AuthHelper.isAuthenticated() || !!userData;
  };

  // Manejar login exitoso
  useEffect(() => {
    try {
      if (!user || typeof window === "undefined") return;

      // Usar AuthHelper para el login
      AuthHelper.setToken(data?.login.token);
      AuthHelper.setUserData(user);
      setUserData(user || null);

      // Guardar los accesos y el seleccionado
      if (user?.UserPermissions && user.UserPermissions.length > 0) {
        console.log("ENTRO?//");
        AuthHelper.setAccesses(user.UserPermissions);
        setUserPermissions(user.UserPermissions);

        console.log("LOG--useEffect", user.UserPermissions[0]);
        // Seleccionar el primer acceso por defecto
        AuthHelper.setSelectedAccess(user.UserPermissions[0]);
        setSelectedAccess(user.UserPermissions[0]);
      }
    } catch (e) {
      console.error("UserProvider effect error:", e instanceof Error ? e.message : String(e));
    }
  }, [user]);

  const contextValue: AuthContextProps = {
    userInfo: userData,
    setUserInfo: setUserData,
    loading,
    login,
    logout,
    getSelectedAccess,
    selectedAccess,
    getAccessData,
    isAuthenticated,
    changeSelectedAccess,
    userAccesses: userPermissions,
    error: error || loginError
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

// Hook personalizado para React (opcional)
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    console.error('useUser must be used within AuthProvider');
  }

  return context;
}

export default UserContext;