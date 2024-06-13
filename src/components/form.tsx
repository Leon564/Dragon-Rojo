/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select, Switch } from "antd";
import useForm from "../hooks/useForm";
import useTitle from "../hooks/useTitle";

const CertificateForm = () => {
  useTitle("Crear Diploma");
  const { form, onSubmit, pdf, setPdf, loading } = useForm();

 
  //const [message, setMessage] = useState("");

 

  const handlePdf = () => {
    localStorage.setItem("pdf", !pdf ? "true" : "false");
    setPdf(!pdf);
  };

  const OPTIONS = [
    { value: "9kup", label: "Blanca Puntas Amarillas 9 kup" },
    { value: "8kup", label: "Amarilla 8 kup" },
    { value: "7kup", label: "Amarilla Puntas Verdes 7 kup" },
    { value: "6kup", label: "Verde 6 kup" },
    { value: "5kup", label: "Verde Puntas Azules 5 kup" },
    { value: "4kup", label: "Azul 4 kup" },
    { value: "3kup", label: "Azul Puntas Rojas 3 kup" },
    { value: "2kup", label: "Roja 2 kup" },
    { value: "1kup", label: "Roja Puntas Negras 1 kup" },
    { value: "1dan", label: "Negra 1 dan" },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">Crear Diploma</h1>
      <Form
        onFinish={onSubmit}
        layout="vertical"
        form={form}
        initialValues={{ pdf }}
      >
        <div className="flex flex-wrap -mx-3 mb-6 text-center max-md:justify-center">
          <Form.Item
            className="mt-5 w-full md:w-1/2 px-3 mb-6 md:mb-0"
            name="name"
            label="Apellido"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su apellido",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            className="mt-5 w-full md:w-1/2 px-3 mb-6 md:mb-0"
            name="last_name"
            label="Apellido"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su apellido",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            className="mt-5 w-full md:w-1/2 px-3 mb-6 md:mb-0"
            name="lvl"
            label="Grado"
            rules={[
              {
                required: true,
                message: "Por favor seleccione un grado",
              },
            ]}
          >
            <Select
              className=""
              showSearch
              size="large"
              placeholder="Seleccione un grado"
              optionFilterProp="children"
              options={OPTIONS}
            />
          </Form.Item>

          <Form.Item
            className="mt-5 w-full md:w-1/2 px-3 mb-6 md:mb-0"
            name="date"
            label="Fecha"
            rules={[
              {
                required: true,
                message: "Por favor selecciona una fecha",
              },
            ]}
          >
            <DatePicker size="large" className="w-full h-full" format={"YYYY-MM-DD"} />
          </Form.Item>
          <Form.Item
            className="flex flex-row align-bottom mt-5 w-full md:w-1/2 px-3 mb-6 md:mb-0"
            name="pdf"
            label="PDF"
            labelCol={{ span: 24 }}
          >
            <Switch
              onChange={() => handlePdf()}
              checked={pdf}
              className="bg-gray-400 text-white cursor-pointer mb-2 ml-2"
            />
          </Form.Item>
          <Form.Item className="mt-24">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              size="large"
            >
              Crear
            </Button>
          </Form.Item>
        </div>
        {/* <div className="text-red-500 text-sm">{message}</div> */}
      </Form>
    </div>
  );
};
export default CertificateForm;


