/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import logo from "../Assets/icoDR.png";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full">
      <nav className="flex  items-center justify-between flex-wrap bg-gray-800 dark:bg-gray-800 p-1">
        <div className=" ml-24 md:ml-5 flex items-center flex-shrink-0 text-white mr-6">
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
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4 ml-5"
            >
              Escuela de Tae Kwon Do
            </a>
          </div>
          <div>
            <a
              href="#"
              className="cursor-pointer block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4"
            >
              Concepcion Quezaltepeque
            </a>
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
