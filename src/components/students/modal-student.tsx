import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { Student } from "../../libs/interfaces/student.interface";
import { LEVELS } from "../../libs/constants";
import { useEffect } from "react";
import dayjs from "dayjs";

const ModalStudent = ({
  student,
  onClose,
  onSave,
  open,
}: {
  student?: Student;
  onClose: () => void;
  onSave: (student: Student) => void;
  open: boolean;
}) => {
  const options = LEVELS.map((level) => ({
    label: level.color,
    value: level.level,
  }));

  const [form] = Form.useForm();

  useEffect(() => {
    if (student) {
      form.setFieldsValue({
        first_name: student.firstName,
        last_name: student.lastName,
        weight: student.weight ? student.weight : undefined,
        level: student.level,
        dateOfBirth: dayjs(student.dateOfBirth),
        gender: student.gender,
      });
    }

    return () => {
      form.resetFields();
    };
  }, [student, form]);

  return (
    <Modal
      open={open}
      title="Estudiante"
      footer={null}
      onClose={onClose}
      onCancel={onClose}
      width={800}
      destroyOnClose
    >
      <div className="flex flex-col gap-2 p-10">
        <Form layout="vertical" form={form} onFinish={onSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              className="m-0 p-0"
              name="first_name"
              label="Nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor el nombre del estudiante",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="m-0 p-0"
              name="last_name"
              label="Apellido"
              rules={[
                {
                  required: true,
                  message: "Por favor el apellido del estudiante",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="m-0 p-0"
              name="weight"
              label="Peso"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="m-0 p-0"
              name="gender"
              label="Genero"
              rules={[
                {
                  required: true,
                  message: "Por favor seleccione un genero",
                },
              ]}
            >
              <Select
                className=""
                showSearch
                size="large"
                placeholder="Seleccione un genero"
                optionFilterProp="children"
                options={[
                  { label: "Masculino", value: "M" },
                  { label: "Femenino", value: "F" },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="m-0 p-0"
              name="level"
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
                options={options}
              />
            </Form.Item>
            <Form.Item
              className="m-0 p-0"
              name="dateOfBirth"
              label="Fecha de nacimiento"
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
          </div>
          <div className="flex justify-center gap-10 mt-10">
            <Form.Item>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="primary"
                htmlType="submit"
              >
                {student ? "Actualizar" : "Guardar"}
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

export default ModalStudent;
