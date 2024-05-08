/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { useEffect, useState } from "react";

const useForm = () => {
  const [pdf, setPdf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {

    setPdf(localStorage.getItem("pdf") === "true" ? true : false);

  }, []);

  const onSubmit = (e: any) => {
    setLoading(true);
    const date = e.date;
    e.month = getMonth(date.month() + 1, true);
    e.day = date.date();
    e.year = date.year();

    delete e.date;
    const query = Object.keys(e)
      .map((key) => {
        if (e[key] !== undefined && e[key] !== false) {
          return `${key}=${e[key]}`;
        }
        return "";
      })
      .join("&");

    window.open(
      encodeURI(`${import.meta.env.VITE_API_URL}/new?${query}`),
      "_blank"
    );
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
