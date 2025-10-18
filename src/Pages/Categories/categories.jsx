import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { Button, Tag } from "antd";
import { getAllCategories } from "../../api/categories";
import { getSubCategoriesByCategory } from "../../api/subCategory";
import { useQuery } from "@tanstack/react-query";
import AddCategory from "./addCategory";
import DeleteCategory from "./deleteCategory";
import UpdateCategory from "./updateCategory";
import AddSubCategory from "../SubCategories/addSubCategory";
import { Image } from "antd";

const SubCategoriesCell = ({ categoryId }) => {
  const { data: subCategories } = useQuery({
    queryKey: ["subCategories", categoryId],
    queryFn: () => getSubCategoriesByCategory(categoryId),
    enabled: !!categoryId,
  });

  const subCategoriesList = subCategories?.data || [];

  if (subCategoriesList.length === 0) {
    return <span className="text-gray-400">No subcategories</span>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {subCategoriesList.slice(0, 3).map((subCat) => (
        <Tag key={subCat._id} color="blue" size="small">
          {subCat.name}
        </Tag>
      ))}
      {subCategoriesList.length > 3 && (
        <Tag color="default" size="small">
          +{subCategoriesList.length - 3} more
        </Tag>
      )}
    </div>
  );
};

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
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <Image
        width={60}
        height={40}
        src={text}
        alt="Category Image"
        style={{ objectFit: "cover", borderRadius: "4px" }}
      />
    ),
  },
  {
    title: "Sub Categories",
    key: "subCategories",
    render: (text, record) => <SubCategoriesCell categoryId={record._id} />,
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div className="flex gap-2 items-center">
        <UpdateCategory record={record} />
        <DeleteCategory record={record} />
      </div>
    ),
  },
];

const Categories = () => {
  // const [subCategories, setSubCategories] = useState(1);
  // const [subCategoriesWithData, setSubCategoriesWithData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: categories, isLoading: isGetCategoriesLoading } = useQuery({
    queryKey: ["categories", page, pageSize],
    queryFn: () => getAllCategories(page, pageSize),
  });

  const disPlayedData = categories?.data || [];
  const totalCount = categories?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Categories</h1>
        <div className="flex gap-2 items-center">
          <AddCategory />
          <AddSubCategory />
        </div>
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
