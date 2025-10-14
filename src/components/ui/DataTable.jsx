import { Table } from "antd";
import React from "react";

const DataTable = ({ columns, data , pagination, loading }) => {
  return <Table loading={loading} columns={columns} dataSource={data} pagination={pagination} />;
};

export default DataTable;
