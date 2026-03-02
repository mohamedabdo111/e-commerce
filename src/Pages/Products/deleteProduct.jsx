import React, { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/products";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const DeleteProduct = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  const queryClient = useQueryClient();
  const { mutateAsync: deleteProductMutation, isPending: isDeleteProductLoading } = useMutation({
    mutationFn: () => deleteProduct(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.productDeleted"));
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error(t("toasts.productDeleteFailed"));
    },
  });

  return (
    <ConfirmModal
      title={t("modals.deleteProduct")}
      message={t("modals.confirmDeleteProduct")}
      onOk={() => deleteProductMutation()}
      onCancel={() => setIsModalOpen(false)}
      IconComponent={<TrashIcon size={20} />}
      isModalOpen={isModalOpen}
      isLoading={isDeleteProductLoading}
      setIsModalOpen={setIsModalOpen}
      handleOpenModal={() => setIsModalOpen(true)}
    />
  );
};

export default DeleteProduct;
