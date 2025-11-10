// src/context/UserContext.jsx
import { type ApolloError } from "@apollo/client";
import { atom, useAtom } from 'jotai';
import { createContext, useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation, type UserInfo, type UserPermissionsInfo } from '~/graphql/_generated/graphql';
import { AuthStorage } from "~/utils/auth.storage";
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

const userDataAtom = atom(AuthStorage.getUserData());
const selectedAccessAtom = atom(AuthStorage.getSelectedAccess());
const userAccessesAtom = atom(AuthStorage.getPermissions());

AuthStorage.debugAuthState()

export function UserProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const [mutate, { data, loading, error: errorMutation }] = useLoginMutation();
  const [userData, setUserData] = useAtom(userDataAtom);
  const [selectedAccess, setSelectedAccess] = useAtom(selectedAccessAtom);
  const [userPermissions, setUserPermissions] = useAtom(userAccessesAtom);

  const user = data?.login?.user;

  console.log("RESPONSE data", data);

  const success = data?.login?.success || false;
  const message = data?.login?.message;
  const loginError = !success && message ? new Error(message) : undefined

  const login = async (nickname: string, password: string) => {
    const { data } = await mutate({ variables: { input: { nickname, password } } });
    AuthStorage.setToken(data?.login.token);
    AuthStorage.setRefreshToken(data?.login.refreshToken);

    if (data?.login?.user) {
      AuthStorage.setUserData(data?.login?.user);
      AuthStorage.setAccesses(data?.login?.user.UserPermissions);
      AuthStorage.setSelectedAccess(data?.login?.user.UserPermissions[0]);
    }

    await navigate(Referrer.getOnce());
  };

  const isAuthenticated = () => {
    return !!AuthStorage.hasToken() || !!userData;
  };

  const checkAuth = () => {
    if (!AuthStorage.hasToken() || !!userData) {
      if (Referrer.get() === null) Referrer.set(window.location.pathname);
      navigate("/login");
    }
  }

  const logout = async () => {
    AuthStorage.logout();
    navigate("/login");
  };

  // Manejar cambio de acceso
  const changeSelectedAccess = (detail: UserPermissionsInfo) => {
    console.log("changeSelectedAccess...", detail);
    // event.detail
    AuthStorage.setSelectedAccess(detail);
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
      return AuthStorage.getPermissions() || [];
      // const stored = sessionStorage.getItem("access_data");
      // return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing access data:", error);
      return [];
    }
  };

  // Manejar login exitoso
  useEffect(() => {
    if (!user || typeof window === "undefined") return;
    try {
      setUserData(user || null);
      setUserPermissions(user?.UserPermissions);
      setSelectedAccess(user.UserPermissions[0]);
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
    error: errorMutation ? new Error("Ha ocurrido un error al intentar iniciar sesión") : loginError
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default UserContext;