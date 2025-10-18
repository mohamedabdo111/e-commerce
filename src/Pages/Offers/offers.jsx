import React, { useState } from "react";
import DataTable from "../../components/ui/DataTable";
import { Tag } from "antd";
import { getAllOffers } from "../../api/offers";
import { useQuery } from "@tanstack/react-query";
import AddOffer from "./addOffer";
import DeleteOffer from "./deleteOffer";
import UpdateOffer from "./updateOffer";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Discount",
    dataIndex: "discount",
    key: "discount",
    render: (text) => <Tag color="blue">{text}%</Tag>,
  },
  {
    title: "Products Price",
    dataIndex: "products",
    key: "products",
    render: (text) => <Tag color="blue">{text[0].price} EGP</Tag>,
  },
  {
    title: "Start Date",
    dataIndex: "startDate",
    key: "startDate",
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "End Date",
    dataIndex: "endDate",
    key: "endDate",
    render: (text) => new Date(text).toLocaleDateString(),
  },

  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <div className="flex gap-2 items-center">
        <UpdateOffer record={record} />
        <DeleteOffer record={record} />
      </div>
    ),
  },
];

const Offers = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: offers, isLoading: isGetOffersLoading } = useQuery({
    queryKey: ["offers", page, pageSize],
    queryFn: () => getAllOffers(page, pageSize),
  });

  const displayedData = offers?.data || [];
  const totalCount = offers?.pagination?.total || 0;

  return (
    <div>
      <header className="flex justify-between mb-3 items-center">
        <h1 className="text-2xl font-semibold ">Offers</h1>
        <AddOffer />
      </header>
      <DataTable
        loading={isGetOffersLoading}
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

export default Offers;
