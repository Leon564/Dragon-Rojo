/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Navigate,
  useLocation,
  useRoutes,
} from "react-router-dom";
import Login from "../components/login";
import Layout from "../components/layout";
import CertificateForm from "../components/form";
import { useCallback, useContext } from "react";
import { AuthContext } from "../auth.context";
import History from "../components/history";
import Start from "../components/start";
import Students from "../components/students/students";

const Routes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const protectedRoutes = [
    {
      path: "/",
      element: <Layout children={<Start />} />,
    },
    {
      path: "/create",
      element: <Layout children={<CertificateForm />} />,
    },
    {
      path: "/history",
      element: <Layout children={<History />} />,
    },
    {
      path: "/students",
      element: <Layout children={<Students />} />,
    },
  ];

  const publicRoutes = [
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const ProtectedRoute = ({ children }: any) => {
    const location = useLocation();

    const redirectToLogin = useCallback(
      () => <Navigate to="/login" state={{ from: location }} replace />,
      [location]
    );

    return isAuthenticated ? children : redirectToLogin();
  };

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

  return useRoutes([...routes, ...publicRoutes]);
};

export default Routes;
