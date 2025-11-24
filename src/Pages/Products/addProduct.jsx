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
import toast from "react-hot-toast";

const AddProduct = ({ record = null, isUpdate = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  // Set form values when updating
  useEffect(() => {
    if (isUpdate && record && isModalOpen) {
      console.log(record);
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
    // Clear subcategory when category changes
    form.setFieldValue("subCategory", undefined);
  };

  const handleChangeSubCategory = (value) => {
    form.setFieldValue("subCategory", value);
  };

  const {
    data: categories,
    isLoading: isGetCategoriesLoading,
    // isError: isGetCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });
  const {
    data: getSpicificSubCategories,
    isLoading: isGetSpicificSubCategoriesLoading,
    // isError: isGetSpicificSubCategoriesError,
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
        toast.success("Product added successfully");
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        toast.error(error?.response?.data.message);
        console.error(error?.response?.data.message);
      },
    });

  const { mutateAsync: updateNewProduct, isPending: isUpdateProductLoading } =
    useMutation({
      mutationFn: (value) => updateProduct(record._id, value),
      onSuccess: () => {
        setIsModalOpen(false);
        toast.success("Product updated successfully");
        form.resetFields();
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
      onError: (error) => {
        toast.error("Failed to update product");
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
      await updateNewProduct(submitData);
    } else {
      await addNewProduct(submitData);
    }
  };

  const isLoading = isAddProductLoading || isUpdateProductLoading;
  const title = isUpdate ? "Update Product" : "Add Product";
  const buttonText = isUpdate ? "Update Product" : "Add Product";
  const submitButtonText = isUpdate ? "Update Product" : "Add Product";

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
            // rules={[{ required: true, message: "Please input your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="wholesalePrice"
            name="wholesalePrice"
            type="number"
            rules={[
              { required: true, message: "Please input your wholesalePrice" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="retailPrice"
            name="retailPrice"
            type="number"
            rules={[
              { required: true, message: "Please input your retailPrice" },
            ]}
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
            rules={[
              { required: true, message: "Please input your sub category" },
            ]}
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
              {submitButtonText}
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </>
  );
};

export default AddProduct;
