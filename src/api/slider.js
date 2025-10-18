import BASE_URL from "./baseURL";

// /api/sliders?page=1&limit=10&active=true
export const getAllSliders = async (page = 1, limit = 10) => {
  const response = await BASE_URL.get(
    `/api/sliders?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getSingleSlider = async (id) => {
  const response = await BASE_URL.get(`/api/sliders/${id}`);
  return response.data;
};

// {
//     "title": "New Arrivals",
//     "description": "Check out our latest products",
//     "image": "https://example.com/slider1.jpg",
//     "link": "/products?sort=-createdAt",
//     "active": true,
//     "order": 1
//   }
export const createSlider = async (data) => {
  const response = await BASE_URL.post(`/api/sliders`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateSlider = async (id, data) => {
  const response = await BASE_URL.patch(`/api/sliders/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteSlider = async (id) => {
  const response = await BASE_URL.delete(`/api/sliders/${id}`);
  return response.data;
};
