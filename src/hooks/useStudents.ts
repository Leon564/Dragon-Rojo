/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { deleteStudentService, getStudentsService } from "../services/api";
import { Form, message } from "antd";
import useDebounce from "./useDebounce";
import { useNavigate } from "react-router-dom";
import useQuery from "./useQuery";

const useStudents = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);
  const [form] = Form.useForm();

  const _name = Form.useWatch("name", form);
  const name = useDebounce(_name, 500);

  useEffect(() => {
    if (!name) query.delete("name");
    else query.set("name", name);
    const newSearch = `?${query.toString()}`;
    navigate({ search: newSearch });
  }, [name, navigate, query]);

  useEffect(() => {
    console.log("Name", name);
   
    const fetchStudents = async () => {
      console.log("Fetching students");
      const filter = name ? JSON.stringify({
        $or: [
          { firstName: { $regex: name, $options: "i" } },
          { lastName: { $regex: name, $options: "i" } },
          { $expr: { $regexMatch: { input: { $concat: ['$firstName', ' ', '$lastName'] }, regex: name, options: 'i' } } }
        ]
      }) : undefined;
      const students = await getStudentsService({ filter, limit:1, page:2 });
      setStudents(students.data);
    };
    fetchStudents();
  }, [name]);

  const deleteStudent = async (id: string) => {
    console.log("Deleting", id);
    const response = await deleteStudentService(id);
    if (!response.error) {
      setStudents((prev) => prev.filter((item) => item._id !== id));
      message.success("Estudiante eliminado");
      return;
    }
    message.error("Error al eliminar el estudiante");
  };

  return { students, deleteStudent, form };
};

export default useStudents;
