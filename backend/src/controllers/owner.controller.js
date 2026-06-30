import { fetchOwnerDashboard } from "../services/owner.service.js";

export const dashboard = async (req, res) => {
  try {
    const data = await fetchOwnerDashboard(req.user.id);

    res.status(200).json({
      success: true,
      dashboard: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};