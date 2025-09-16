import React, { useState } from "react";
import { Button, Modal } from "antd";
const ModalComponent = ({ title, children, buttonText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button>
      <Modal
        title={title}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        width={800}
        // height={800}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        style={{
          height: "800",
          width: "800px",
        }}
      >
        <div className="max-h-[500px] w-full overflow-y-auto">{children}</div>
      </Modal>
    </>
  );
};
export default ModalComponent;
