import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { getAllProducts } from "../../api/products";
import { useQuery } from "@tanstack/react-query";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: text => <a>{text}</a>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <img src={text} alt="Product Image" width={60} height={40} />
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "category",
    dataIndex: "category",
    key: "category",
    render: (text, record) => <div>{record.category.name}</div>,
  },

  {
    title: "Sub Category",
    dataIndex: "subCategory",
    key: "subCategory",
    render: (text, record) => <div>{record.subCategory.name}</div>,
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2 items-center">
        <UpdateProduct record={record} />
        <DeleteProduct record={record} />
      </div>
    ),
  },
];

const Products = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: products, isLoading: isGetProductsLoading } = useQuery({
    queryKey: ["products", page, pageSize],
    queryFn: () => getAllProducts(page, pageSize),
  });

  const displayedData = products?.data || [];
  const totalCount = products?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Products</h1>
        <AddProduct />
      </header>
      <DataTable
        loading={isGetProductsLoading}
        columns={columns}
        data={displayedData}
        pagination={{
          pageSize: pageSize,
          current: page,
          total: totalCount,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default Products;
