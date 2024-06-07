import { useEffect, useState } from "react";
import { checkTokenService, loginService } from "../services/api";
import { message } from "antd";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const redirect = (path: string) => {
    const baseUrl = `${window.location.protocol}//${window.location.hostname}${
      window.location.port ? `:${window.location.port}` : ""
    }`;
    window.location.href = `${baseUrl}${path}`;
  };

  useEffect(() => {
    console.log(window.location.pathname);
    if (isAuthenticated && window.location.pathname === "/login") {
      redirect("/");
      console.log("redirect");
    }
  }, [isAuthenticated]);

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      if (localStorage.getItem("token")) {
        const response = await checkTokenService();
        if (!response.error) {
          setIsAuthenticated(true);
          setUser(response.username);
          return;
        }
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        message.error(response.message);
        console.log(response);
        console.log("checkToken");
        redirect("/login");
      }
    };
    checkToken();
  }, [path]);

  const login = async ({
    username,
    password,
    rememberMe,
  }: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setLoading(true);
    const response = await loginService({
      username,
      password,
      rememberMe,
    });
    if (!response.error) {
      redirect("/");
      localStorage.setItem("token", response.access_token);
      setLoading(false);
      return;
    }
    message.error(response.message);
    console.log(response);
    console.log("login");
    setLoading(false);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(undefined);
    redirect("/login");
  };
  return { login, logout, isAuthenticated, user, loading };
};

export default useAuth;
