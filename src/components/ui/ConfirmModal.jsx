import { Modal, Button } from "antd";
import React from "react";

const ConfirmModal = ({
  title,
  message,
  onOk,
  onCancel,
  isModalOpen,
  IconComponent,
  handleOpenModal,
  isLoading,
}) => {
  return (
    <>
      <div onClick={handleOpenModal} className="cursor-pointer">{IconComponent}</div>
      <Modal
        title={
          <>
            <h1>{title}</h1>
          </>
        }
        confirmLoading={isLoading}
        open={isModalOpen}
        onOk={onOk}
        okText="Delete"
        okType="danger"
        // loading={isLoading}
        cancelText="Cancel"
        onCancel={onCancel}
      >
        
        <p>{message}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
