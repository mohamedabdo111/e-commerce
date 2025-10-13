import BASE_URL from "./baseURL";

export const getAllCategories = async (page = 1, limit = 10) => {
  const response = await BASE_URL.get(`/api/categories?page=${page}&limit=${limit}`);
  return response.data;
};


export const addCategory = async (data) => {
  const response = await BASE_URL.post("/api/categories", data);
  return response.data;
};


export const updateCategory = async (id, data) => {
  const response = await BASE_URL.put(`/api/categories/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await BASE_URL.delete(`/api/categories/${id}`);
  return response.data;
};


export const getCategoryById = async (id) => {
  const response = await BASE_URL.get(`/api/categories/${id}`);
  return response.data;
};