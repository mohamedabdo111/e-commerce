import React, { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/categories";
import { useTranslation } from "react-i18next";

const DeleteCategory = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategoryMutation, isPending: isDeleteCategoryLoading } = useMutation({
    mutationFn: () => deleteCategory(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.categoryDeleted"));
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error(t("toasts.categoryDeleteFailed"));
    },
  });

  return (
    <ConfirmModal
      title={t("modals.deleteCategory")}
      message={t("modals.confirmDeleteCategory")}
      onOk={() => deleteCategoryMutation()}
      onCancel={() => setIsModalOpen(false)}
      IconComponent={<TrashIcon />}
      isModalOpen={isModalOpen}
      isLoading={isDeleteCategoryLoading}
      setIsModalOpen={setIsModalOpen}
      handleOpenModal={() => setIsModalOpen(true)}
    />
  );
};

export default DeleteCategory;
