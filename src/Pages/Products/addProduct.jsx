import { Form } from "antd";
import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/ui/Modal";
import ImageUpload from "../../components/ui/ImageUpload";
import { Input } from "antd";
import { Button } from "antd";
import { Select } from "antd";
import { Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "../../api/categories";
import { getAllSubCategories } from "../../api/subCategory";
import { addProduct, updateProduct } from "../../api/products";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const AddProduct = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      form.setFieldsValue({
        name: record.name,
        description: record.description,
        price: record.price,
        stock: record.stock,
        category: record.category?._id || record.category,
        subCategory: record.subCategory?._id || record.subCategory,
        wholesalePrice: record.originalWholesalePrice,
        retailPrice: record.retailPrice,
      });
      setSelectedCategory(record.category?._id || record.category);
    }
  }, [isUpdate, record, isModalOpen, form]);

  const handleChange = (value) => {
    setSelectedCategory(value);
    form.setFieldValue("subCategory", undefined);
  };

  const handleChangeSubCategory = (value) => {
    form.setFieldValue("subCategory", value);
  };

  const { data: categories, isLoading: isGetCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const {
    data: getSpicificSubCategories,
    isLoading: isGetSpicificSubCategoriesLoading,
  } = useQuery({
    queryKey: ["getSpicificSubCategories", selectedCategory],
    queryFn: () => getAllSubCategories(1, 100),
    enabled: !!selectedCategory,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: addNewProduct, isPending: isAddProductLoading } =
    useMutation({
      mutationFn: (value) => addProduct(value),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.productAdded"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        toast.error(error?.response?.data.message || t("toasts.productAddFailed"));
      },
    });

  const { mutateAsync: updateNewProduct, isPending: isUpdateProductLoading } =
    useMutation({
      mutationFn: (value) => updateProduct(record._id, value),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success(t("toasts.productUpdated"));
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: () => {
        toast.error(t("toasts.productUpdateFailed"));
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
      await updateNewProduct(submitData);
    } else {
      await addNewProduct(submitData);
    }
  };

  const isLoading = isAddProductLoading || isUpdateProductLoading;
  const title = isUpdate ? t("buttons.updateProduct") : t("buttons.addProduct");
  const buttonText = isUpdate ? t("buttons.updateProduct") : t("buttons.addProduct");

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
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item
          label="Wholesale Price"
          name="wholesalePrice"
          type="number"
          rules={[{ required: true, message: "Please input wholesale price" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Retail Price"
          name="retailPrice"
          type="number"
          rules={[{ required: true, message: "Please input retail price" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: "Please input your stock" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Select category"
          name="category"
          rules={[{ required: true, message: "Please input your category" }]}
        >
          <Select
            loading={isGetCategoriesLoading}
            onChange={handleChange}
            placeholder="Select category"
            options={categories?.data?.map((category) => ({
              label: category.name,
              value: category._id,
            }))}
          />
        </Form.Item>
        <Form.Item
          label="Select sub category"
          name="subCategory"
          rules={[{ required: true, message: "Please input your sub category" }]}
        >
          <Select
            loading={isGetSpicificSubCategoriesLoading}
            onChange={handleChangeSubCategory}
            placeholder="Select sub category"
            options={getSpicificSubCategories?.data
              ?.filter(
                (subCategory) =>
                  subCategory.category === selectedCategory ||
                  subCategory.category?._id === selectedCategory
              )
              ?.map((subCategory) => ({
                label: subCategory.name,
                value: subCategory._id,
              }))}
          />
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

export default AddProduct;
