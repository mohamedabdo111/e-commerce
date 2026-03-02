import React, { useState } from "react";
import { Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "../../api/orders";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const UpdateOrderStatus = ({ record }) => {
  const [value, setValue] = useState(record.status);
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const statusOptions = [
    { label: t("status.pending"), value: "pending" },
    { label: t("status.confirmed"), value: "confirmed" },
    { label: t("status.shipped"), value: "shipped" },
    { label: t("status.delivered"), value: "delivered" },
    { label: t("status.cancelled"), value: "cancelled" },
  ];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (newStatus) => updateOrderStatus(record._id, newStatus),
    onSuccess: () => {
      toast.success(t("toasts.orderStatusUpdated"));
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("toasts.orderStatusFailed"));
      setValue(record.status);
    },
  });

  const handleChange = async (newStatus) => {
    setValue(newStatus);
    await mutateAsync(newStatus);
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      loading={isPending}
      disabled={isPending}
      options={statusOptions}
      style={{ width: 130 }}
      size="small"
    />
  );
};

export default UpdateOrderStatus;
