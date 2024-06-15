/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  createDocumentService,
  deleteDocumentService,
  getDocumentsService,
} from "../services/api";
import { message } from "antd";

const useHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  useEffect(() => {
    const fetchHistory = async () => {
      const documents = await getDocumentsService();
      setHistory(documents.data);
    };
    fetchHistory();
  }, []);

  const download = async (id: string, type: "pdf" | "docx") => {
    const data = history.find((item) => item._id === id);
    if (data) {
      const response = await createDocumentService({
        name: data.name,
        last_name: data.lastName,
        lvl: data.level,
        date: data.date,
        pdf: type === "pdf",
        saveHistory: false,
      });

      if (response) {
        const url = window.URL.createObjectURL(
          new Blob([await response.blob()])
        );
        const link = document.createElement("a");
        const fileName = `${data.name} ${data.lastName}.${type}`;
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        //setLoading(false);
      }
    }
  };

  const deleteDocument = async (id: string) => {
    const response = await deleteDocumentService(id);
    if (!response.error) {
      setHistory((prev) => prev.filter((item) => item._id !== id));
      message.success("Documento eliminado");
      return;
    }
    message.error("Error al eliminar el documento");
  };

  return { history, download, deleteDocument };
};

export default useHistory;
