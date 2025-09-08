// src/context/UserContext.jsx
import { type ApolloError } from "@apollo/client";
import { atom, useAtom } from 'jotai';
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useLoginMutation } from '~/graphql/_generated/graphql';
import { AuthHelper, type UserAccess, type UserData } from "~/utils/authHelper";

export type AuthContextProps = {
  userInfo: UserData | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserData | null>>;
  loading: boolean;
  login: (nickname: string, password: string) => Promise<null | undefined>;
  logout: () => Promise<void>;
  getSelectedAccess: () => any;
  selectedAccess: UserAccess | null;
  getAccessData: () => UserAccess[];
  isAuthenticated: () => boolean;
  changeSelectedAccess: (detail: UserAccess) => void;
  userAccesses: UserAccess[] | null;
  error: ApolloError | undefined;
}

const UserContext = createContext<AuthContextProps | undefined>(undefined);

const userDataAtom = atom(AuthHelper.getUserData());
const selectedAccessAtom = atom(AuthHelper.getSelectedAccess());
const userAccessesAtom = atom(AuthHelper.getAccesses());

AuthHelper.debugAuthState()

export function UserProvider({ children }: PropsWithChildren) {
  const [mutate, { data, loading, error }] = useLoginMutation();

  const [userData, setUserData] = useAtom(userDataAtom);
  const [selectedAccess, setSelectedAccess] = useAtom(selectedAccessAtom);
  const [userAccesses, setUserAccesses] = useAtom(userAccessesAtom);

  const login = async (nickname: string, password: string) => {
    try {
      await mutate({
        variables: {
          input: { nickname, password }
        }
      });
      // const response = await graphqlClient.mutation(AUTH_QUERIES_LOGIN, {
      //   input: { nickname, password },
      // });
      // if (!response.login.success) {
      //   return {
      //     success: false,
      //     message: response.login.message,
      //   };
      // }
    } catch (error) {
      console.error("Error query login:", (error as Error).message);
      return null;
    }
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
      setUserAccesses([]);
      window.location.href = "/";
    }
  };

  // Manejar cambio de acceso
  const changeSelectedAccess = (detail: UserAccess) => {
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
      return AuthHelper.getAccesses() || [];
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
      if (!data || !data?.login?.user) return;
      if (typeof window === "undefined") return; // guard SSR
      // Usar AuthHelper para el login
      AuthHelper.setToken(data?.login.token);
      AuthHelper.setUserData(data?.login.user);

      const user = data.login.user;

      setUserData(user || null);

      // Guardar los accesos y el seleccionado
      if (user?.UserAccess && user.UserAccess.length > 0) {
        console.log("ENTRO?//");
        AuthHelper.setAccesses(user.UserAccess);
        setUserAccesses(user.UserAccess);

        console.log("LOG--useEffect", user.UserAccess[0]);
        // Seleccionar el primer acceso por defecto
        AuthHelper.setSelectedAccess(user.UserAccess[0]);
        setSelectedAccess(user.UserAccess[0]);
      }
    } catch (e) {
      console.error("UserProvider effect error:", e instanceof Error ? e.message : String(e));
    }
  }, [data]);

  const contextValue = {
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
    userAccesses,
    error
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