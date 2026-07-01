import api from "./api";

// =========================
// Get Stores
// =========================
export const getStores = async (
  search = "",
  sortBy = "id",
  order = "ASC"
) => {
  const response = await api.get("/admin/stores", {
    params: {
      search,
      sortBy,
      order,
    },
  });

  return response.data;
};

// =========================
// Get Store Owners
// =========================
export const getStoreOwners = async () => {
  const response = await api.get(
    "/admin/store-owners"
  );

  return response.data.owners;
};

// =========================
// Create Store
// =========================
export const createStore = async (storeData) => {
  const response = await api.post(
    "/admin/stores",
    storeData
  );

  return response.data;
};

// =========================
// Get Store By ID
// =========================
export const getStoreById = async (id) => {
  const response = await api.get(
    `/admin/stores/${id}`
  );

  return response.data.store;
};

// =========================
// Update Store
// =========================
export const updateStore = async (
  id,
  storeData
) => {
  const response = await api.put(
    `/admin/stores/${id}`,
    storeData
  );

  return response.data;
};

// =========================
// Delete Store
// =========================
export const deleteStore = async (id) => {
  const response = await api.delete(
    `/admin/stores/${id}`
  );

  return response.data;
};