import { getOwnerDashboard } from "../repositories/owner.repository.js";

export const fetchOwnerDashboard = async (ownerId) => {
  return await getOwnerDashboard(ownerId);
};