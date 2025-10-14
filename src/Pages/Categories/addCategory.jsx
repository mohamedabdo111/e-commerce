import React, { useState } from 'react'
import { Form } from 'antd';
import ModalComponent from '../../components/ui/Modal';
import { Input } from 'antd';
import { Button } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { addCategory } from '../../api/categories';
import toast from 'react-hot-toast';

const AddCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const { mutateAsync: addCategoryMutation, isLoading: isAddCategoryLoading } = useMutation({
        mutationFn: (data) => addCategory(data),
        onSuccess: () => {
            setIsModalOpen(false);
            toast.success("Category added successfully");
            form.resetFields();
        },
        onError: (error) => {
            toast.error("Failed to add category");
            console.log(error);
        }
    });

    const handleAddCategory = async (values) => {
        await addCategoryMutation(values);
    }



  return (
    <>
     <ModalComponent 
          title="Add Category" 
          buttonText="Add Category" 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        >
          <Form form={form} onFinish={handleAddCategory} layout="vertical">
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
            {/* {Array.from({ length: subCategories }).map((_, index) => (
              <Form.Item
                key={index}
                label="Sub Category"
                name={`subCategory${index}`}
                rules={[
                  {
                    required: true,
                    message: "Please input your sub category",
                  },
                ]}
              >
                <Input
                  value={setSubCategoriesWithData[index] || ""}
                  onChange={(e) => {
                    const updated = [...subCategoriesWithData];
                    updated[index] = e.target.value;
                    setSubCategoriesWithData(updated);
                  }}
                />
              </Form.Item>
            ))}
            <div
              className="flex items-center gap-2 cursor-pointer mb-3"
              onClick={() => setSubCategories(subCategories + 1)}
            >
              <Plus size={18} className="text-gray-600" />
              <span className="text-gray-600">Add Sub Category</span>
            </div> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isAddCategoryLoading}>
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>
    </>
  )
}

export default AddCategory