import BASE_URL from "./baseURL";

export const getAllSubCategories = async (page = 1, limit = 10) => {
    const response = await BASE_URL.get(`/api/subcategories?page=${page}&limit=${limit}`);
    return response.data;
}

export const addSubCategory = async (data) => {
    const response = await BASE_URL.post("/api/subcategories", data);
    return response.data;
}

export const updateSubCategory = async (id, data) => {
    const response = await BASE_URL.put(`/api/subcategories/${id}`, data);
    return response.data;
}

export const deleteSubCategory = async (id) => {
    const response = await BASE_URL.delete(`/api/subcategories/${id}`);
    return response.data;
}

export const getSubCategoryById = async (id) => {
    const response = await BASE_URL.get(`/api/subcategories/${id}`);
    return response.data;
}