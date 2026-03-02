import React, { useState } from "react";
import { Table, Tag, Select, Image } from "antd";
import { getAllOrders } from "../../api/orders";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import UpdateOrderStatus from "./updateOrderStatus";
import DeleteOrder from "./deleteOrder";

const statusColors = {
  pending: "orange",
  confirmed: "blue",
  shipped: "geekblue",
  delivered: "green",
  cancelled: "red",
};

const itemColumns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 70,
    render: (src) =>
      src ? (
        <Image
          width={48}
          height={48}
          src={src}
          alt="product"
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ) : (
        "—"
      ),
  },
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "quantity",
    width: 80,
  },
  {
    title: "Unit Price",
    dataIndex: "unitPrice",
    key: "unitPrice",
    width: 120,
    render: (price) => `${price} EGP`,
  },
  {
    title: "Subtotal",
    key: "subtotal",
    width: 120,
    render: (_, item) => `${item.quantity * item.unitPrice} EGP`,
  },
];

const columns = [
  {
    title: "Customer",
    dataIndex: "customerName",
    key: "customerName",
  },
  {
    title: "Phone",
    dataIndex: "customerPhone",
    key: "customerPhone",
  },
  {
    title: "Items",
    dataIndex: "items",
    key: "items",
    render: (items) => `${items?.length || 0} item(s)`,
  },
  {
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (price) => `${price} EGP`,
  },
  {
    title: "Payment",
    dataIndex: "paymentMethod",
    key: "paymentMethod",
    render: (method) => (
      <Tag>{method === "vodafone_cash" ? "Vodafone Cash" : "COD"}</Tag>
    ),
  },
  {
    title: "Delivery",
    dataIndex: "deliveryMethod",
    key: "deliveryMethod",
    render: (method) => (
      <Tag>{method === "pickup" ? "Pickup" : "Delivery"}</Tag>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={statusColors[status]}>{status?.toUpperCase()}</Tag>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text) => new Date(text).toLocaleDateString(),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <div className="flex gap-2 items-center">
        <UpdateOrderStatus record={record} />
        <DeleteOrder record={record} />
      </div>
    ),
  },
];

const Orders = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const { t } = useTranslation();

  const statusFilterOptions = [
    { label: t("status.all"), value: "" },
    { label: t("status.pending"), value: "pending" },
    { label: t("status.confirmed"), value: "confirmed" },
    { label: t("status.shipped"), value: "shipped" },
    { label: t("status.delivered"), value: "delivered" },
    { label: t("status.cancelled"), value: "cancelled" },
  ];

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", page, pageSize, statusFilter],
    queryFn: () => getAllOrders(page, pageSize, statusFilter || undefined),
  });

  const displayedData = orders?.data || [];
  const totalCount = orders?.pagination?.total || 0;

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between mb-3 sm:items-center gap-2">
        <h1 className="text-lg sm:text-2xl font-semibold">{t("pages.orders")}</h1>
        <Select
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setPage(1);
          }}
          options={statusFilterOptions}
          style={{ width: 160 }}
          placeholder={t("buttons.filterByStatus")}
        />
      </header>
      <Table
        loading={isLoading}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={displayedData}
        rowKey="_id"
        pagination={{
          pageSize,
          current: page,
          total: totalCount,
          onChange: (p, ps) => {
            setPage(p);
            setPageSize(ps);
          },
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div style={{ padding: "8px 0" }}>
              <Table
                columns={itemColumns}
                dataSource={record.items}
                rowKey={(item, i) => item.product || i}
                pagination={false}
                size="small"
              />
              {record.deliveryAddress && (
                <p className="mt-3 text-sm text-gray-600">
                  <strong>Address:</strong> {record.deliveryAddress}
                </p>
              )}
              {record.notes && (
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Notes:</strong> {record.notes}
                </p>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default Orders;
