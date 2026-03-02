import React, { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffer } from "../../api/offers";
import { useTranslation } from "react-i18next";

const DeleteOffer = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteOfferMutation, isPending: isDeleteOfferLoading } =
    useMutation({
      mutationFn: () => deleteOffer(record?._id),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.offerDeleted"));
        queryClient.invalidateQueries({ queryKey: ["offers"] });
      },
      onError: () => {
        toast.error(t("toasts.offerDeleteFailed"));
      },
    });

  return (
    <ConfirmModal
      title={t("modals.deleteOffer")}
      message={t("modals.confirmDeleteOffer")}
      onOk={() => deleteOfferMutation()}
      onCancel={() => setIsModalOpen(false)}
      IconComponent={<TrashIcon />}
      isModalOpen={isModalOpen}
      isLoading={isDeleteOfferLoading}
      setIsModalOpen={setIsModalOpen}
      handleOpenModal={() => setIsModalOpen(true)}
    />
  );
};

export default DeleteOffer;
