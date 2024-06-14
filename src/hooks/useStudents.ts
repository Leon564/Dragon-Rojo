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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [form] = Form.useForm();

  const _name = Form.useWatch("name", form);
  const name = useDebounce(_name, 500);

  const level = Form.useWatch("level", form);

  useEffect(() => {
    if (!level) query.delete("level");
    else query.set("level", level);
    const newSearch = `?${query.toString()}`;
    navigate({ search: newSearch });
  }, [level, navigate, query]);

  useEffect(() => {
    if (!name) query.delete("name");
    else query.set("name", name);
    const newSearch = `?${query.toString()}`;
    navigate({ search: newSearch });
  }, [name, navigate, query]);

  useEffect(() => {
    console.log("Name", name);
    setLoading(true);
    const fetchStudents = async () => {
      console.log("Fetching students");
      let filter:any = {};
      if (name)
        filter = {
          $or: [
            { firstName: { $regex: name, $options: "i" } },
            { lastName: { $regex: name, $options: "i" } },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex: name,
                  options: "i",
                },
              },
            },
          ],
        };
      
      if (level) filter.level = level;

      const students = await getStudentsService({ filter:JSON.stringify(filter), page, limit });
      setStudents(students.data);
      setTotal(students.meta.count);
      setLoading(false);
    };
    fetchStudents();
  }, [name, level, page, limit]);

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

  const resetFilters = () => {
    form.resetFields();
    query.delete("name");
    query.delete("level");
    const newSearch = `?${query.toString()}`;
    console.log("New search", newSearch);
    navigate({ search: newSearch });
  };

  return { students, deleteStudent, form, loading, page, setPage, limit, setLimit, total, resetFilters};
};

export default useStudents;
