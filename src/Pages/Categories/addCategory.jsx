import React, { useState, useEffect } from "react";
import { Form } from "antd";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Input } from "antd";
import { Button } from "antd";
import { Edit } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory, updateCategory } from "../../api/categories";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const AddCategory = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

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
        toast.success(t("toasts.categoryAdded"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: () => {
        toast.error(t("toasts.categoryAddFailed"));
      },
    });

  const {
    mutateAsync: updateCategoryMutation,
    isLoading: isUpdateCategoryLoading,
  } = useMutation({
    mutationFn: (data) => updateCategory(record._id, data),
    onSuccess: () => {
      setIsModalOpen(false);
      toast.success(t("toasts.categoryUpdated"));
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error(t("toasts.categoryUpdateFailed"));
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
      await updateCategoryMutation(submitData);
    } else {
      await addCategoryMutation(submitData);
    }
  };

  const isLoading = isAddCategoryLoading || isUpdateCategoryLoading;
  const title = isUpdate ? t("buttons.updateCategory") : t("buttons.addCategory");
  const buttonText = isUpdate ? t("buttons.updateCategory") : t("buttons.addCategory");

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
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your description" }]}
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
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </ModalComponent>
  );
};

export default AddCategory;
