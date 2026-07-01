import api from "./api";

// =========================
// Get Users
// =========================
export const getUsers = async (
  search = "",
  sortBy = "id",
  order = "ASC"
) => {
  const response = await api.get("/admin/users", {
    params: {
      search,
      sortBy,
      order,
    },
  });

  return response.data;
};

// =========================
// Create User
// =========================
export const createUser = async (userData) => {
  const response = await api.post(
    "/admin/users",
    userData
  );

  return response.data;
};

// =========================
// Get User By ID
// =========================
export const getUserById = async (id) => {
  const response = await api.get(
    `/admin/users/${id}`
  );

  return response.data.user;
};

// =========================
// Update User
// =========================
export const updateUser = async (
  id,
  userData
) => {
  const response = await api.put(
    `/admin/users/${id}`,
    userData
  );

  return response.data;
};

// =========================
// Delete User
// =========================
export const deleteUser = async (id) => {
  const response = await api.delete(
    `/admin/users/${id}`
  );

  return response.data;
};