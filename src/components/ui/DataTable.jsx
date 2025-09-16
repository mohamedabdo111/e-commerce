import { Table } from "antd";
import React from "react";

const DataTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default DataTable;
