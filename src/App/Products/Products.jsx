import React from "react";
import DataTable from "../../components/ui/DataTable";
import { Button, Form, Input } from "antd";
import ModalComponent from "../../components/ui/Modal";
import { Plus } from "lucide-react";
import { Select } from "antd";

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

const Products = () => {
  const handleAddCategory = (values) => {
    console.log(values);
  };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Products</h1>
        <ModalComponent title="Add Product" buttonText="Add Product">
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
              rules={[{ required: true, message: "Please input your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input your price" }]}
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
              name="selectdCategory"
              rules={[
                { required: true, message: "Please input your category" },
              ]}
            >
              <Select
                onChange={handleChange}
                defaultValue="Categories"
                options={[
                  { value: "jack", label: "Jack" },
                  { value: "lucy", label: "Lucy" },
                  { value: "Yiminghe", label: "yiminghe" },
                  { value: "disabled", label: "Disabled", disabled: true },
                ]}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>
      </header>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Products;
