/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import logo from "../Assets/icoDR.png";
import { Button } from "antd";
import { AuthContext } from "../auth.context";
import { Link, useNavigate } from "react-router-dom";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <nav className="flex  items-center justify-between flex-wrap bg-gray-800 dark:bg-gray-800 p-1">
        <div
          className=" ml-24 md:ml-5 flex items-center flex-shrink-0 text-white mr-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="fill-current h-16 w-16 mr-2"
            width="80"
            height="80"
          />
          <span className="font-bold text-xl tracking-tight">Dragon Rojo</span>
        </div>
        <div className="w-full md:block flex-grow lg:flex lg:items-center lg:w-auto hidden">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/history"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4 ml-5"
            >
              Historial
            </Link>
          </div>
          <div>
            <Button
              type="text"
              className="text-white hover:!text-gray-500 mr-4 ml-5 hover:!bg-transparent"
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="p-5 w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
