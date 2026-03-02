import React, { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOrder } from "../../api/orders";
import { useTranslation } from "react-i18next";

const DeleteOrder = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteOrderMutation, isPending: isLoading } = useMutation({
    mutationFn: () => deleteOrder(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.orderDeleted"));
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      toast.error(t("toasts.orderDeleteFailed"));
    },
  });

  return (
    <ConfirmModal
      title={t("modals.deleteOrder")}
      message={t("modals.confirmDeleteOrder")}
      onOk={() => deleteOrderMutation()}
      onCancel={() => setIsModalOpen(false)}
      IconComponent={<TrashIcon size={18} />}
      isModalOpen={isModalOpen}
      isLoading={isLoading}
      setIsModalOpen={setIsModalOpen}
      handleOpenModal={() => setIsModalOpen(true)}
    />
  );
};

export default DeleteOrder;
