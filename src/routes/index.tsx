/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Navigate,
  useLocation,
  useRoutes,
} from "react-router-dom";
import { lazy, useCallback, useContext } from "react";
import { AuthContext } from "../auth.context";

const Login = lazy(() => import("../components/login"));
const History = lazy(() => import("../components/history"));
const Start = lazy(() => import("../components/start"));
const Students = lazy(() => import("../components/students/students"));
const Layout = lazy(() => import("../components/layout/layout"));
const CertificateForm = lazy(() => import("../components/form"));

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
