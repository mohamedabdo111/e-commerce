import React, { useState } from 'react'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { TrashIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../../api/products'
import toast from 'react-hot-toast'
const DeleteProduct = ({ record }   ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const queryClient = useQueryClient();
  const { mutateAsync: deleteProductMutation, isPending: isDeleteProductLoading } = useMutation({
    mutationFn: () => deleteProduct(record?._id),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error("Failed to delete product");
      console.log(error);
    }
  });
  return (
   <>
   
   <ConfirmModal
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onOk={() => deleteProductMutation()}
        onCancel={handleCancel}
        IconComponent={<TrashIcon size={20} />}
        isModalOpen={isModalOpen}
        isLoading={isDeleteProductLoading}
        setIsModalOpen={setIsModalOpen}
        handleOpenModal={handleOpenModal}

      />
   </>
  )
}

export default DeleteProduct