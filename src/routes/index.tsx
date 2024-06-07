/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../components/login";
import Layout from "../components/layout";
import CertificateForm from "../components/form";
import { useCallback, useContext } from "react";
import { AuthContext } from "../auth.context";
import History from "../components/history";

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const protectedRoutes = [
    {
      path: "/",
      element: <Layout children={<CertificateForm />} />,
    },
    {
      path: "/history",
      element: <Layout children={<History />} />,
    },
  ];

  const publicRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const ProtectedRoute = useCallback(
    ({ children }: any) => {
      return isAuthenticated ? children : <Navigate to="/login" />;
    },
    [isAuthenticated]
  );

  const routes = protectedRoutes.map((route) => {
    return {
      ...route,
      element: <ProtectedRoute>{route.element}</ProtectedRoute>,
    };
  });

  routes.push({
    path: "*",
    element: <Navigate to="/" />,
  });

  const element = createBrowserRouter([...routes, ...publicRoutes]);

  return element;
};

export default Routes;
