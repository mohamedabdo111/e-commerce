import React, { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSlider } from "../../api/slider";
import { useTranslation } from "react-i18next";

const DeleteSlider = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteSliderMutation,
    isPending: isDeleteSliderLoading,
  } = useMutation({
    mutationFn: () => deleteSlider(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.sliderDeleted"));
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: () => {
      toast.error(t("toasts.sliderDeleteFailed"));
    },
  });

  return (
    <ConfirmModal
      title={t("modals.deleteSlider")}
      message={t("modals.confirmDeleteSlider")}
      onOk={() => deleteSliderMutation()}
      onCancel={() => setIsModalOpen(false)}
      IconComponent={<TrashIcon />}
      isModalOpen={isModalOpen}
      isLoading={isDeleteSliderLoading}
      setIsModalOpen={setIsModalOpen}
      handleOpenModal={() => setIsModalOpen(true)}
    />
  );
};

export default DeleteSlider;
