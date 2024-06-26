import {
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  HistoryOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const functions = [
  {
    name: "Estudiantes",
    description: "Administrar los estudiantes de la aplicación",
    icon: <TeamOutlined/>,
    path: "/students",
    active: true,
  },
  {
    name: "Crear Documento",
    description:
      "Crear un nuevo documento de diploma para descargarlo en PDF o DOCX",
    icon: <AppstoreOutlined />,
    path: "/create",
    active: true,
  },
  {
    name: "Historial",
    description: "Ver los documentos que has creado y descargarlos nuevamente",
    icon: <HistoryOutlined />,
    path: "/history",
    active: true,
  },
  {
    name: "Administrar Usuarios",
    description: "Administrar los usuarios de la aplicación",
    icon: <UserOutlined />,
    path: "/users",
    active: false,
  },
  // Agrega más funciones aquí
];

const StartMenu = () => {
  useTitle("Inicio");
  return (
    <div
      className="flex items-center justify-center bg-gray-100 p-0 m-0"
      style={{ minHeight: "calc(100vh - 125px)" }}
    >
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Start Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {functions.map((func, index) => (
            <Link
              key={index}
              className={`bg-white p-10 rounded shadow hover:shadow-lg transition duration-300 flex items-center flex-row cursor-pointer ${
                !func.active
                  ? "opacity-50 !cursor-not-allowed "
                  : ""
              }`}
              to={func.active ? func.path : ""}
            >
              <div className="mr-4 text-3xl">{func.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{func.name}</h2>
                <p>{func.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
