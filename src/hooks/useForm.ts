/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import dayjs from "dayjs";
import { createDocumentService } from "../services/api";

const useForm = () => {
  const [pdf, setPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    setPdf(localStorage.getItem("pdf") === "true" ? true : false);
  }, []);

  const [searchParams] = useSearchParams();
  const docId = searchParams.get("doc");
  useEffect(() => {
    const fetchDocument = async () => {
      if (!docId) return;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/documents/${docId}`
      );
      const data = await response.json();

      form.setFieldsValue({
        name: data.name,
        last_name: data.lastName,
        date: dayjs(data.date),
        lvl: data.level,
      });
      form.validateFields();
    };
    fetchDocument();
  }, [docId, form]);

  const onSubmit = async (e: any) => {
    setLoading(true);
    // // const date = e.date;
    // // console.log(e.date.format("YYYY-MM-DD"));
    // // e.month = getMonth(date.month() + 1, true);
    // // e.day = date.date();
    // // e.year = date.year();
    // // console.log(e.date);
    // // setLoading(false);
    // // return;
    // e.date = e.date.format("YYYY-MM-DD");
    // console.log(e);

    // const query = Object.keys(e)
    //   .map((key) => {
    //     if (e[key] !== undefined && e[key] !== false) {
    //       return `${key}=${e[key]}`;
    //     }
    //     return "";
    //   })
    //   .join("&");

    // // window.open(
    // //   encodeURI(`${import.meta.env.VITE_API_URL}/api/new?${query}`),
    // //   "_blank"
    // // );

    // const headers = new Headers();
    // //headers.append("authorization", `Bearer ${localStorage.getItem("token")}`);
    // headers.append(
    //   "authorization",
    //   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMyIsInN1YiI6IjY2NjIzNmIyYWM4ZjUxZGNkYWI0Nzk1NCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTc3MTI1NjMsImV4cCI6MTc0OTI0ODU2M30.qqdtOcALsFMCo5cBOCR8_BXWyUjUD_on4KRbwtAFoHk`
    // );

    // const response = await fetch(
    //   `${import.meta.env.VITE_API_URL}/documents/create?${query}`,
    //   {
    //     method: "GET",
    //     headers,
    //   }
    // ).catch((error) => {
    //   message.error("Error al generar el diploma, intenta de nuevo.");
    //   console.error("Error:", error);
    //   setLoading(false);
    //   return;
    // });

    const response = await createDocumentService({
      ...e,
      saveHistory: true,
    });

    if (response) {
      const url = window.URL.createObjectURL(new Blob([await response.blob()]));
      const link = document.createElement("a");
      const fileName = `${e.name} ${e.last_name}${pdf ? ".pdf" : ".docx"}`;
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
