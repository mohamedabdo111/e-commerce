import React from "react";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../../api/categories";
const DeleteCategory = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutateAsync: deleteCategoryMutation, isPending: isDeleteCategoryLoading } = useMutation({
    mutationFn: () => deleteCategory(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Failed to delete category");
      console.log(error);
    }
  });

  return (
    <>
      <ConfirmModal
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        onOk={() => deleteCategoryMutation()}
        onCancel={handleCancel}
        IconComponent={<TrashIcon />}
        isModalOpen={isModalOpen}
        isLoading={isDeleteCategoryLoading}
        setIsModalOpen={setIsModalOpen}
        handleOpenModal={handleOpenModal}

      />
    </>
  );
};

export default DeleteCategory;
