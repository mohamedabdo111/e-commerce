import React from "react";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSlider } from "../../api/slider";

const DeleteSlider = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteSliderMutation,
    isPending: isDeleteSliderLoading,
  } = useMutation({
    mutationFn: () => deleteSlider(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Slider deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: (error) => {
      toast.error("Failed to delete slider");
      console.log(error);
    },
  });

  return (
    <>
      <ConfirmModal
        title="Delete Slider"
        message="Are you sure you want to delete this slider?"
        onOk={() => deleteSliderMutation()}
        onCancel={handleCancel}
        IconComponent={<TrashIcon />}
        isModalOpen={isModalOpen}
        isLoading={isDeleteSliderLoading}
        setIsModalOpen={setIsModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default DeleteSlider;
