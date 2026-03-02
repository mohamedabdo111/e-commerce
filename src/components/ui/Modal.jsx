import React from "react";
import { Button, Modal } from "antd";

const ModalComponent = ({
  title,
  children,
  buttonText,
  isModalOpen,
  setIsModalOpen,
  customButton,
}) => {
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <>
      {customButton || (
        <Button type="primary" onClick={showModal}>
          {buttonText}
        </Button>
      )}
      <Modal
        title={title}
        closable={{ "aria-label": "Close" }}
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        style={{ maxWidth: 800 }}
      >
        <div className="max-h-[70vh] w-full overflow-y-auto">{children}</div>
      </Modal>
    </>
  );
};

export default ModalComponent;
