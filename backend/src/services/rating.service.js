import {
  findRating,
  createRating,
  updateRating,
   findStoreById,
} from "../repositories/rating.repository.js";

// Submit Rating
export const submitRating = async (
  userId,
  storeId,
  rating
) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const store = await findStoreById(storeId);

  if (!store) {
    throw new Error("Store not found");
  }

  const existing = await findRating(userId, storeId);

  if (existing) {
    throw new Error(
      "You have already rated this store."
    );
  }

  return await createRating(userId, storeId, rating);
};

// Modify Rating
export const modifyRating = async (
  userId,
  storeId,
  rating
) => {
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }
  const store = await findStoreById(storeId);

if (!store) {
  throw new Error("Store not found.");
}

  return await updateRating(userId, storeId, rating);
};