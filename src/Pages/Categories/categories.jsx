import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { Button, Form, Input } from "antd";
import ModalComponent from "../../components/ui/Modal";
import { Plus } from "lucide-react";
import { getAllCategories } from "../../api/categories";
import { useQuery } from "@tanstack/react-query";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: text => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Action",
    key: "action",
  },
];

const data = [
  {
    name: "John Doe",
    age: 30,
    address: "123 Main St",
  },
];
const Categories = () => {
  const [subCategories, setSubCategories] = useState(1);
  const [subCategoriesWithData, setSubCategoriesWithData] = useState([]);
  const handleAddCategory = (values) => {
    console.log(values);
  };

  const { data: categories, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  console.log(categories);
  console.log(isLoading);
  console.log(isError);
  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Categories</h1>
        <ModalComponent title="Add Category" buttonText="Add Category">
          <Form onFinish={handleAddCategory} layout="vertical">
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
            {/* add sub category */}

            {Array.from({ length: subCategories }).map((_, index) => (
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
            </div>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>
      </header>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Categories;
