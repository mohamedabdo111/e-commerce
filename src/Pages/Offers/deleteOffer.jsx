import React from "react";
import { useState } from "react";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { TrashIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOffer } from "../../api/offers";

const DeleteOffer = ({ record }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutateAsync: deleteOfferMutation, isPending: isDeleteOfferLoading } =
    useMutation({
      mutationFn: () => deleteOffer(record?._id),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success("Offer deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["offers"] });
      },
      onError: (error) => {
        toast.error("Failed to delete offer");
        console.log(error);
      },
    });

  return (
    <>
      <ConfirmModal
        title="Delete Offer"
        message="Are you sure you want to delete this offer?"
        onOk={() => deleteOfferMutation()}
        onCancel={handleCancel}
        IconComponent={<TrashIcon />}
        isModalOpen={isModalOpen}
        isLoading={isDeleteOfferLoading}
        setIsModalOpen={setIsModalOpen}
        handleOpenModal={handleOpenModal}
      />
    </>
  );
};

export default DeleteOffer;
