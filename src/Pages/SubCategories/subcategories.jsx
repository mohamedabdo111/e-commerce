import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { getAllSubCategories } from "../../api/subCategory";
import { useQuery } from "@tanstack/react-query";
import AddSubCategory from "./addSubCategory";
import DeleteSubCategory from "./deleteSubCategory";
import UpdateSubCategory from "./updateSubCategory";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => category?.name || "N/A",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div className="flex gap-2 items-center">
        <UpdateSubCategory record={record} />
        <DeleteSubCategory record={record} />
      </div>
    ),
  },
];

const SubCategories = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: subCategories, isLoading: isGetSubCategoriesLoading } =
    useQuery({
      queryKey: ["subCategories", page, pageSize],
      queryFn: () => getAllSubCategories(page, pageSize),
    });

  const disPlayedData = subCategories?.data || [];
  const totalCount = subCategories?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold">Sub Categories</h1>
        <AddSubCategory />
      </header>
      <DataTable
        loading={isGetSubCategoriesLoading}
        columns={columns}
        data={disPlayedData}
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

export default SubCategories;
