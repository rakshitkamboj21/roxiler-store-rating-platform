import api from "./api";

export const getStores = async () => {
  const response = await api.get("/stores");
  return response.data;
};

export const addRating = async (storeId, rating) => {
  const response = await api.post("/ratings", {
    store_id: storeId,
    rating,
  });

  return response.data;
};

export const updateRating = async (storeId, rating) => {
  const response = await api.put(`/ratings/${storeId}`, {
    rating,
  });

  return response.data;
};