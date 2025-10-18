import BASE_URL from "./baseURL";

export const getAllProducts = async (page = 1, limit = 10) => {
  const response = await BASE_URL.get(
    `/api/products?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const addProduct = async (data) => {
  // Append all form fields to FormData
  //   Object.keys(data).forEach((key) => {
  //     if (key === "image" && data[key] instanceof File) {
  //       formData.append("image", data[key]);
  //     } else if (key !== "image") {
  //       formData.append(key, data[key]);
  //     }
  //   });

  const response = await BASE_URL.post("/api/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await BASE_URL.patch(`/api/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await BASE_URL.delete(`/api/products/${id}`);
  return response.data;
};
