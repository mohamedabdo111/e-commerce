import React from "react";
import { Edit } from "lucide-react";
import AddOffer from "./addOffer";

const UpdateOffer = ({ record }) => {
  return <AddOffer record={record} isUpdate={true} />;
};

export default UpdateOffer;
