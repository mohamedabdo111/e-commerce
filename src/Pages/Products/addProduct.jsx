import { Form } from "antd";
import React, { useState } from "react";
import ModalComponent from "../../components/ui/Modal";
import { Input } from "antd";
import { Button } from "antd";
import { Select } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories } from "../../api/categories";
import { getAllSubCategories } from "../../api/subCategory";
import { addProduct } from "../../api/products";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();


  
  const handleChange = (value) => {
      
      setSelectedCategory(value);
    };
    
    const handleChangeSubCategory = (value) => {
        form.setFieldValue("selectedSubCategory", value);
    };
    
    const {
        data: categories,
        isLoading: isGetCategoriesLoading,
        // isError: isGetCategoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getAllCategories(),
    });
    
    
    const handleAddProduct = async (values) => {
        try {
            await addNewProduct(values)
            toast.success("Product added successfully")
            form.resetFields()
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
            toast.error("Failed to add product")
        }
      console.log(values);
    };
  const {
    data: getSpicificSubCategories,
    isLoading: isGetSpicificSubCategoriesLoading,
    // isError: isGetSpicificSubCategoriesError,
  } = useQuery({
    queryKey: ["getSpicificSubCategories", selectedCategory],
    queryFn: () => getAllSubCategories(),
    enabled: !!selectedCategory,
  });

  const queryClient = useQueryClient();
  const {mutateAsync : addNewProduct , isPending} = useMutation({
    mutationFn :(value)=> addProduct(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error("Failed to add product");
      console.log(error);
    }
  })


  return (
    <>
      <ModalComponent
        title="Add Product"
        buttonText="Add Product"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      >
        <Form form={form} onFinish={handleAddProduct} layout="vertical">
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
            label="Price"
            name="price"
            type="number"
            rules={[{ required: true, message: "Please input your price" , }]}
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
              defaultValue="Categories"
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
              defaultValue="Sub Categories"
              options={getSpicificSubCategories?.data?.map((category) => ({
                label: category.name,
                value: category._id,
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </>
  );
};

export default AddProduct;
