import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { Button, Tag, Image } from "antd";
import { getAllSliders } from "../../api/slider";
import { useQuery } from "@tanstack/react-query";
import AddSlider from "./addSlider";
import DeleteSlider from "./deleteSlider";
import UpdateSlider from "./updateSlider";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => (
      <Image
        width={60}
        height={40}
        src={text}
        alt="Slider"
        style={{ objectFit: "cover", borderRadius: "4px" }}
      />
    ),
  },
  {
    title: "Order",
    dataIndex: "order",
    key: "order",
    render: (text) => <Tag color="blue">{text}</Tag>,
  },
  {
    title: "Status",
    dataIndex: "active",
    key: "active",
    render: (text, record) => (
      <Tag color={record.active ? "green" : "red"}>
        {record.active ? "Active" : "Inactive"}
      </Tag>
    ),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div className="flex gap-2 items-center">
        <UpdateSlider record={record} />
        <DeleteSlider record={record} />
      </div>
    ),
  },
];

const Sliders = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: sliders, isLoading: isGetSlidersLoading } = useQuery({
    queryKey: ["sliders", page, pageSize],
    queryFn: () => getAllSliders(page, pageSize),
  });

  const displayedData = sliders?.data || [];
  const totalCount = sliders?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Sliders</h1>
        <AddSlider />
      </header>
      <DataTable
        loading={isGetSlidersLoading}
        columns={columns}
        data={displayedData}
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

export default Sliders;
