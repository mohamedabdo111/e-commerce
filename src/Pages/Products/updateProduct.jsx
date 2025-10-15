import React from "react";
import { Edit } from "lucide-react";
import { Button } from "antd";
import AddProduct from "./addProduct";

const UpdateProduct = ({ record }) => {
  return <AddProduct record={record} isUpdate={true} />;
};

export default UpdateProduct;
