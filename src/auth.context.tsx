/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import useAuth from "./hooks/useAuth";

interface AuthContextInterface {
  isAuthenticated: boolean;
  user?: string;
  login?: (props:any) => void;
  logout?: () => void;
  loading?: boolean;
}

const AuthContext = React.createContext<AuthContextInterface>({
  isAuthenticated: !!localStorage.getItem("token"),
  user: undefined,
  login: () => {},
  logout: () => {},
  loading: false,
});

const AuthProvider = (props: any) => {
  const { login, logout, isAuthenticated, user, loading } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
