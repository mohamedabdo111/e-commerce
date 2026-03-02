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
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const { Option } = Select;

const AddSubCategory = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        name: record.name,
        description: record.description,
        category: record.category?._id || record.category,
      });
    }
  }, [isUpdate, record, isModalOpen, form]);

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(1, 100),
  });

  const queryClient = useQueryClient();

  const {
    mutateAsync: addSubCategoryMutation,
    isLoading: isAddSubCategoryLoading,
  } = useMutation({
    mutationFn: (data) => addSubCategory(data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.subCategoryAdded"));
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error(t("toasts.subCategoryAddFailed"));
    },
  });

  const {
    mutateAsync: updateSubCategoryMutation,
    isLoading: isUpdateSubCategoryLoading,
  } = useMutation({
    mutationFn: (data) => updateSubCategory(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.subCategoryUpdated"));
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["subCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error(t("toasts.subCategoryUpdateFailed"));
    },
  });

  const handleSubmit = async (values) => {
    const imageFile = form.getFieldValue("image");
    const submitData = { ...values };

    if (imageFile && imageFile !== "existing-image") {
      submitData.image = imageFile;
    } else {
      delete submitData.image;
    }

    if (isUpdate) {
      await updateSubCategoryMutation(submitData);
    } else {
      await addSubCategoryMutation(submitData);
    }
  };

  const isLoading = isAddSubCategoryLoading || isUpdateSubCategoryLoading;
  const title = isUpdate ? t("buttons.updateSubCategory") : t("buttons.addSubCategory");
  const buttonText = isUpdate ? t("buttons.updateSubCategory") : t("buttons.addSubCategory");

  const customButton = isUpdate ? (
    <Edit
      className="cursor-pointer"
      size={20}
      onClick={() => setIsModalOpen(true)}
    />
  ) : null;

  return (
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
          rules={[{ required: true, message: "Please input sub category name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input sub category description" }]}
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
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default AddSubCategory;
