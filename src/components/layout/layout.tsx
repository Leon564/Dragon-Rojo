 
import React, { useContext } from "react";
import logo from "../../assets/icoDR.png";
import { Button } from "antd";
import { AuthContext } from "../../auth.context";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";
import AnimatedDrawer from "../common/drawer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  //const mobileMenu = () => {

  const toggleDrawer = () => {
    //await 1 second to close the drawer

    setOpen(!open);
  };

  return (
    <>
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
            <span className="font-bold text-xl tracking-tight">
              Dragon Rojo
            </span>
          </div>

        
              <Button
                style={{
                  height: 50,
                  width: 50,
                  padding: 0,
                }}
                className="md:hidden"
                type="link"
                icon={
                  <MenuOutlined
                    style={{ fontSize: 30 }}
                    className="text-white"
                  />
                }
                onClick={() => toggleDrawer()}
              />
       
          <div className="w-full md:block flex-grow lg:flex lg:items-center lg:w-auto hidden">
            <div className="text-sm lg:flex-grow">
              <Link
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4 ml-5"
              >
                Inicio
              </Link>
              <Link
                to="/students"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4 ml-5"
              >
                Estudiantes
              </Link>
              <Link
                to="/create"
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 mr-4 ml-5"
              >
                Crear diploma
              </Link>
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
      <AnimatedDrawer onClose={toggleDrawer} visible={open} closable>
        <div className="flex flex-col items-center gap-5">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-gray-500 mr-4 ml-5"
            onClick={() => setOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/history"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-gray-500 mr-4 ml-5"
            onClick={() => setOpen(false)}
          >
            Historial
          </Link>
          <Button
            type="text"
            className=" hover:!text-gray-500 mr-4 ml-5 hover:!bg-transparent font-bold mt-6"
            onClick={logout}
          >
            Cerrar Sesión
          </Button>
        </div>
      </AnimatedDrawer>
    </>
  );
};
export default Layout;
