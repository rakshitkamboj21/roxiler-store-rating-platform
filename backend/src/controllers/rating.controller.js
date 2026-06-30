import {
  submitRating,
  modifyRating,
} from "../services/rating.service.js";

export const addRating = async (req, res) => {
  try {
    const { store_id, rating } = req.body;

    const result = await submitRating(
      req.user.id,
      store_id,
      rating
    );

    res.status(201).json({
      success: true,
      message: "Rating Submitted Successfully",
      rating: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const editRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const result = await modifyRating(
      req.user.id,
      req.params.storeId,
      rating
    );

    res.status(200).json({
      success: true,
      message: "Rating Updated Successfully",
      rating: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};