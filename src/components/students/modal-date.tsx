import { Button, DatePicker, Form, Modal, Switch } from "antd";
import { useEffect, useState } from "react";

const ModalDate = ({
  onClose,
  onOk: onSave,
  open,
  title
}: {
  onClose: () => void;
  onOk: (date: string) => void;
  open: boolean;
    title: string;
}) => {
  const [form] = Form.useForm();

  const [pdf, setPdf] = useState(false);

  useEffect(() => {
    return () => {
      form.resetFields();
    };
  }, [form]);

  const handlePdf = () => {
    localStorage.setItem("pdf", !pdf ? "true" : "false");
    setPdf(!pdf);
  };

  return (
    <Modal
      open={open}      
      footer={null}
      onClose={onClose}
      onCancel={onClose}
      width={500}
      destroyOnClose
    >
      <div className="flex flex-col gap-2 p-10">
      <div className="flex flex-col gap-2 p-5 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
        <Form layout="vertical" form={form} onFinish={onSave}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Form.Item
              className="m-0 p-0"
              name="date"
              label="Fecha de diploma"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione una fecha",
                },
              ]}
            >
              <DatePicker
                className="w-full h-full"
                format={"YYYY-MM-DD"}
                size="large"
                placeholder="Seleccione una fecha"
              />
            </Form.Item>
            <Form.Item
              className="flex flex-row align-bottom mt-5 w-full md:w-1/2 px-3 mb-0"
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
          </div>
          <div className="flex justify-center gap-10 mt-1">
            <Form.Item>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="primary"
                htmlType="submit"
              >
                Descargar
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={onClose}>Cancelar</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalDate;
