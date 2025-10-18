import React from "react";
import { Edit } from "lucide-react";
import AddSlider from "./addSlider";

const UpdateSlider = ({ record }) => {
  return <AddSlider record={record} isUpdate={true} />;
};

export default UpdateSlider;
