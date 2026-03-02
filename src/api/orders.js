import BASE_URL from "./baseURL";

export const getAllOrders = async (page = 1, limit = 10, status) => {
  const params = new URLSearchParams({ page, limit });
  if (status) params.append("status", status);
  const response = await BASE_URL.get(`/api/orders?${params.toString()}`);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await BASE_URL.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  const response = await BASE_URL.patch(`/api/orders/${id}/status`, { status });
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await BASE_URL.delete(`/api/orders/${id}`);
  return response.data;
};
