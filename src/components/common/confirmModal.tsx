import { Button, Modal } from "antd";

const ConfirmModal = ({
  onOk,
  onCancel,
  open,
  body,
  title,
}: {
  onOk: () => void;
  onCancel: () => void;
  open: boolean;
  title?: string;
  body?: string;
}) => {
  return (
    <Modal
      open={open}
      footer={null}
      onClose={onCancel}
      onCancel={onCancel}
      width={500}
    >
      <div className="flex flex-col gap-2 p-5 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex flex-col gap-2  justify-center text-center pt-10">
        <p>{body || "¿Estás seguro de realizar esta acción?"}</p>
      </div>

      <div className="flex flex-col gap-2 p-10">
        <div className="flex justify-center gap-10 mt-5">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="primary"
            onClick={onOk}
          >
            Aceptar
          </Button>

          <Button onClick={onCancel}>Cancelar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
