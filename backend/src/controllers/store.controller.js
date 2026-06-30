import { fetchStores } from "../services/store.service.js";

export const getAllStores = async (req, res) => {
  try {
    const stores = await fetchStores(
      req.user.id,
      req.query
    );

    res.status(200).json({
      success: true,
      stores,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};