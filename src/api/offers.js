import BASE_URL from "./baseURL";

//  /api/offers?page=1&limit=10&active=true

export const getAllOffers = async (page = 1, limit = 10) => {
  const response = await BASE_URL.get(
    `/api/offers?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getSingleOffer = async (id) => {
  const response = await BASE_URL.get(`/api/offers/${id}`);
  return response.data;
};

export const createOffer = async (data) => {
  const response = await BASE_URL.post("/api/offers", data);
  return response.data;
};

export const updateOffer = async (id, data) => {
  const response = await BASE_URL.patch(`/api/offers/${id}`, data);
  return response.data;
};

export const deleteOffer = async (id) => {
  const response = await BASE_URL.delete(`/api/offers/${id}`);
  return response.data;
};
