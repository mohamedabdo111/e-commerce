import BASE_URL from "./baseURL";

export const getAllProducts = async (page = 1, limit = 10) => {
    const response = await BASE_URL.get(`/api/products?page=${page}&limit=${limit}`);
    return response.data;
}

export const addProduct = async (data) => {
    const response = await BASE_URL.post("/api/products", data);
    return response.data;
}

export const updateProduct = async (id, data) => {
    const response = await BASE_URL.put(`/api/products/${id}`, data);
    return response.data;
}

export const deleteProduct = async (id) => {
    const response = await BASE_URL.delete(`/api/products/${id}`);
    return response.data;
}