import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <div onClick={handleOpenModal} className="cursor-pointer">{IconComponent}</div>
      <Modal
        title={<h1>{title}</h1>}
        confirmLoading={isLoading}
        open={isModalOpen}
        onOk={onOk}
        okText={t("buttons.delete")}
        okType="danger"
        cancelText={t("buttons.cancel")}
        onCancel={onCancel}
      >
        <p>{message}</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;
