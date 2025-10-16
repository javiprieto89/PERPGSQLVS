// src/context/UserContext.jsx
import { type ApolloError } from "@apollo/client";
import { atom, useAtom } from 'jotai';
import { createContext, useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation, type UserInfo, type UserPermissionsInfo } from '~/graphql/_generated/graphql';
import { AuthHelper } from "~/utils/authHelper";
import { Referrer } from "~/utils/referrer.session";

export type AuthContextProps = {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  loading: boolean;
  login: (nickname: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
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
  const navigate = useNavigate();

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

  const isAuthenticated = () => {
    return !!AuthHelper.isAuthenticated() || !!userData;
  };

  const checkAuth = () => {
    if (!AuthHelper.isAuthenticated() || !!userData) {
      if (Referrer.get() === null) Referrer.set(window.location.pathname);
      navigate("/login");
    }
  }

  const logout = async () => {
    AuthHelper.logout();
    navigate("/login");
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

  // Manejar login exitoso
  useEffect(() => {
    try {
      if (!user || typeof window === "undefined") return;

      console.log("UserContext useEffect - user changed:", user);
      console.log("data?.login:", data?.login);

      // Usar AuthHelper para el login
      AuthHelper.setToken(data?.login.token);
      AuthHelper.setRefreshToken(data?.login.refreshToken);
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
    checkAuth,
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

export default UserContext;