import React from "react";
import { Edit } from "lucide-react";
import { Button } from "antd";
import AddSubCategory from "./addSubCategory";

const UpdateSubCategory = ({ record }) => {
  return <AddSubCategory record={record} isUpdate={true} />;
};

export default UpdateSubCategory;
