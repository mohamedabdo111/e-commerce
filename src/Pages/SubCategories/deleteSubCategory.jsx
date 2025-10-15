import React from "react";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSubCategory } from "../../api/subCategory";

const DeleteSubCategory = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteSubCategoryMutation,
    isPending: isDeleteSubCategoryLoading,
  } = useMutation({
    mutationFn: () => deleteSubCategory(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Sub Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
    },
    onError: (error) => {
      toast.error("Failed to delete sub category");
      console.log(error);
    },
  });

  return (
    <>
      <ConfirmModal
        title="Delete Sub Category"
        message="Are you sure you want to delete this sub category?"
        onOk={() => deleteSubCategoryMutation()}
        onCancel={handleCancel}
        IconComponent={<TrashIcon />}
        isModalOpen={isModalOpen}
        isLoading={isDeleteSubCategoryLoading}
        setIsModalOpen={setIsModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default DeleteSubCategory;
