/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from "react";
import {
  createStudentService,
  deleteStudentService,
  getStudentsService,
  updateStudentService,
} from "../services/api";
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
  const [deleteView, setDeleteView] = useState(false);

  const [selected, setSelected] = useState<string | undefined>();

  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);

  const [init, setInit] = useState(false);

  const _name = Form.useWatch("name", form);
  const name = useDebounce(_name, 500);

  const level = Form.useWatch("level", form);

  const queryName = query.get("name");
  const queryLevel = query.get("level");
  const queryPage = query.get("page");
  const queryLimit = query.get("limit");

  useEffect(() => {
    if (init) {
      if (!level) query.delete("level");
      else query.set("level", level);
      const newSearch = `?${query.toString()}`;
      navigate({ search: newSearch });
    }
  }, [level]);

  useEffect(() => {
    if (init) {
      if (!name) query.delete("name");
      else query.set("name", name);
      const newSearch = `?${query.toString()}`;
      navigate({ search: newSearch });
    }
  }, [name]);

  useEffect(() => {
    if (init) {
      query.set("page", page.toString());
      query.set("limit", limit.toString());
      const newSearch = `?${query.toString()}`;
      navigate({ search: newSearch });
    }
  }, [page, limit]);

  useEffect(() => {
    if(!init) {
      form.setFieldsValue({ name: queryName, level: queryLevel });
      page && setPage(parseInt(queryPage || "1"));
      limit && setLimit(parseInt(queryLimit || "10"));

    }
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchStudents = async () => {     
      
      let filter: any = {};
      if (queryName) {
        setPage(1);
        filter = {
          $or: [
            { firstName: { $regex: queryName, $options: "i" } },
            { lastName: { $regex: queryName, $options: "i" } },
            {
              $expr: {
                $regexMatch: {
                  input: { $concat: ["$firstName", " ", "$lastName"] },
                  regex: queryName,
                  options: "i",
                },
              },
            },
          ],
        };
      }
      if (queryLevel) filter.level = queryLevel;

      const students = await getStudentsService({
        filter: JSON.stringify(filter),
        page: queryPage || page,
        limit: queryLimit || limit,
      });
      setStudents(students.data);
      setTotal(students.meta.count);
      setLoading(false);
      setInit(true);
    };

    fetchStudents();
  }, [query]);

  const onDelete = async (id: string) => {
    console.log("Deleting", id);
    const response = await deleteStudentService(id);
    if (!response.error) {
      setStudents((prev) => prev.filter((item) => item._id !== id));
      message.success("Estudiante eliminado");
      setDeleteView(false);
      return;
    }
    setDeleteView(false);
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

  const onSave = async (values: any) => {
    const response = await createStudentService(values);
    console.log("Response", response);
    if (!response.error) {
      message.success("Estudiante creado");
      setStudents((prev) => [...prev, response]);
      setVisibleCreate(false);
      return;
    }
    setVisibleCreate(false);
    message.error("Error al crear el estudiante");
  };

  const onEdit = useCallback(
    async (student: any) => {
      console.log("Editing", student);

      const response = await updateStudentService(selected!, student);
      console.log(response);
      if (!response.error) {
        console.log(response);
        message.success("Estudiante actualizado");
        setStudents((prev) =>
          prev.map((item) =>
            item._id === selected ? { ...item, ...student } : item
          )
        );
        setVisibleEdit(false);
        return;
      }
      setVisibleEdit(false);
      message.error("Error al actualizar el estudiante");
    },
    [selected]
  );

  return {
    students,
    form,
    loading,
    page,
    setPage,
    limit,
    setLimit,
    total,
    resetFilters,
    onSave,
    onEdit,
    onDelete,
    deleteView,
    setDeleteView,
    selected,
    setSelected,
    visibleEdit,
    setVisibleEdit,
    visibleCreate,
    setVisibleCreate,
  };
};

export default useStudents;
