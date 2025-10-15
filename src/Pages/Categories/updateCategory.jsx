import React from "react";
import { Edit } from "lucide-react";
import { Button } from "antd";
import AddCategory from "./addCategory";

const UpdateCategory = ({ record }) => {
  return <AddCategory record={record} isUpdate={true} />;
};

export default UpdateCategory;
