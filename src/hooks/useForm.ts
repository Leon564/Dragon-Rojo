/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { createDocumentService, getOneStudentService } from "../services/api";

const useForm = () => {
  const [pdf, setPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setPdf(localStorage.getItem("pdf") === "true" ? true : false);
  }, []);

  const [searchParams] = useSearchParams();
  const docId = searchParams.get("doc");
  const studentId = searchParams.get("student");

  useEffect(() => {
    const fetchDocument = async () => {
      if (!docId) return;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/documents/${docId}`
      );
      const data = await response.json();

      form.setFieldsValue({
        first_name: data.firstName,
        last_name: data.lastName,
        date: dayjs(data.date),
        lvl: data.level,
      });
      form.validateFields();
    };
    fetchDocument();
  }, [docId, form]);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) return;
      const data = await getOneStudentService(studentId);

      form.setFieldsValue({
        first_name: data.firstName,
        last_name: data.lastName,
        date: dayjs(data.date),
        lvl: data.level,
      });
      form.validateFields();
    };
    fetchStudent();
  }, [studentId, form]);

  const onSubmit = async (e: any) => {
    setLoading(true);

    const response = await createDocumentService({
      ...e,
      saveHistory: true,
    });

    if (response) {
      const url = window.URL.createObjectURL(new Blob([await response.blob()]));
      const link = document.createElement("a");
      const fileName = `${e.first_name} ${e.last_name}${pdf ? ".pdf" : ".docx"}`;
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setLoading(false);
    }

    setLoading(false);
  };

  return { onSubmit, pdf, setPdf, loading, form };
};

export const getMonth = (month: number, capitalize: boolean): string => {
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  let monthName = meses[month - 1];
  if (capitalize) {
    monthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  }
  return monthName;
};

export default useForm;
