import { getStores } from "../repositories/store.repository.js";

// =========================
// Get All Stores
// =========================
export const fetchStores = async (userId, query) => {
  const {
    search = "",
    page = 1,
    limit = 10,
  } = query;

  // Allowed sorting fields
  const allowedSortFields = [
    "id",
    "name",
    "email",
    "address",
    "overall_rating",
  ];

  // Validate sortBy
  const sortBy = allowedSortFields.includes(query.sortBy)
    ? query.sortBy
    : "id";

  // Validate order
  const order =
    query.order?.toUpperCase() === "DESC"
      ? "DESC"
      : "ASC";

  const offset = (page - 1) * Number(limit);

  return await getStores(
    userId,
    search,
    sortBy,
    order,
    Number(limit),
    offset
  );
};