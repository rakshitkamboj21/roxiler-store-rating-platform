import {
  registerUser,
  loginUser,
  changePassword,
} from "../services/auth.service.js";

// =========================
// Register User
// =========================
export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      ...result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Login User
// =========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(email, password);

    res.status(200).json({
      success: true,
      message: "Login Successful",
      ...result,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Change Password
// =========================
export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    await changePassword(
      req.user.id,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};