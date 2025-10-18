import React, { useState, useEffect } from "react";
import { Form } from "antd";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Input } from "antd";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory, updateCategory } from "../../api/categories";
import toast from "react-hot-toast";

const AddCategory = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Set form values when updating
  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        name: record.name,
        description: record.description,
      });
    }
  }, [isUpdate, record, isModalOpen, form]);

  const { mutateAsync: addCategoryMutation, isLoading: isAddCategoryLoading } =
    useMutation({
      mutationFn: (data) => addCategory(data),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success("Category added successfully");
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        toast.error("Failed to add category");
        console.log(error);
      },
    });

  const {
    mutateAsync: updateCategoryMutation,
    isLoading: isUpdateCategoryLoading,
  } = useMutation({
    mutationFn: (data) => updateCategory(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Category updated successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Failed to update category");
      console.log(error);
    },
  });

  const handleSubmit = async (values) => {
    // Get the file from form
    const imageFile = form.getFieldValue("image");

    // Prepare data with file
    const submitData = {
      ...values,
    };

    // Only include image if it's a new file (not the placeholder)
    if (imageFile && imageFile !== "existing-image") {
      submitData.image = imageFile;
    } else {
      // remove image from submitData
      delete submitData.image;
    }

    if (isUpdate) {
      await updateCategoryMutation(submitData);
    } else {
      await addCategoryMutation(submitData);
    }
  };

  const isLoading = isAddCategoryLoading || isUpdateCategoryLoading;
  const title = isUpdate ? "Update Category" : "Add Category";
  const buttonText = isUpdate ? "Update Category" : "Add Category";
  const submitButtonText = isUpdate ? "Update Category" : "Add Category";

  // Custom button for update mode
  const customButton = isUpdate ? (
    <Edit
      className="cursor-pointer"
      size={20}
      onClick={() => setIsModalOpen(true)}
    />
  ) : null;

  return (
    <>
      <ModalComponent
        title={title}
        buttonText={buttonText}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        customButton={customButton}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input your description" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <ImageUpload
              form={form}
              fieldName="image"
              existingImage={record?.image}
              isUpdate={isUpdate}
              required={true}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {submitButtonText}
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </>
  );
};

export default AddCategory;
