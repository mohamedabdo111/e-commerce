import React, { useState, useEffect } from "react";
import { Form, Select } from "antd";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Input } from "antd";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSubCategory, updateSubCategory } from "../../api/subCategory";
import { getAllCategories } from "../../api/categories";
import toast from "react-hot-toast";

const { Option } = Select;

const AddSubCategory = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Set form values when updating
  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        name: record.name,
        description: record.description,
        category: record.category?._id || record.category,
      });
    }
  }, [isUpdate, record, isModalOpen, form]);

  // Fetch categories for the dropdown
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(1, 100), // Get all categories
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: addSubCategoryMutation,
    isLoading: isAddSubCategoryLoading,
  } = useMutation({
    mutationFn: (data) => addSubCategory(data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Sub Category added successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Failed to add sub category");
      console.log(error);
    },
  });

  const {
    mutateAsync: updateSubCategoryMutation,
    isLoading: isUpdateSubCategoryLoading,
  } = useMutation({
    mutationFn: (data) => updateSubCategory(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success("Sub Category updated successfully");
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Failed to update sub category");
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
      await updateSubCategoryMutation(submitData);
    } else {
      await addSubCategoryMutation(submitData);
    }
  };

  const isLoading = isAddSubCategoryLoading || isUpdateSubCategoryLoading;
  const title = isUpdate ? "Update Sub Category" : "Add Sub Category";
  const buttonText = isUpdate ? "Update Sub Category" : "Add Sub Category";
  const submitButtonText = isUpdate
    ? "Update Sub Category"
    : "Add Sub Category";

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
            rules={[
              { required: true, message: "Please input sub category name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input sub category description",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select placeholder="Select a category">
              {categoriesData?.data?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
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

export default AddSubCategory;
