import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";

import { getAllCategories } from "../../api/categories";
import { useQuery } from "@tanstack/react-query";
import AddCategory from "./addCategory";
import DeleteCategory from "./deleteCategory";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    // render: text => <a>{text}</a>,
  },

  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => <div>
        <DeleteCategory record={record} />
    </div>,
  },
];

const Categories = () => {
  // const [subCategories, setSubCategories] = useState(1);
  // const [subCategoriesWithData, setSubCategoriesWithData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: categories,
    isLoading: isGetCategoriesLoading,
    isError: isGetCategoriesError,
  } = useQuery({
    queryKey: ["categories", page, pageSize],
    queryFn: () => getAllCategories(page, pageSize),
  });

  const disPlayedData = categories?.data || [];
  const totalCount = categories?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Categories</h1>
        <AddCategory />
      </header>
      <DataTable
        loading={isGetCategoriesLoading}
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

export default Categories;
