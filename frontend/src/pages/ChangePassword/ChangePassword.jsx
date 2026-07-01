import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { changePassword } from "../../services/auth";

import { validatePassword } from "../../utils/validation";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./ChangePassword.css";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // Password Match Validation
    // =========================
    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match!");
      return;
    }

    // =========================
    // Password Validation
    // =========================
    const passwordError =
      validatePassword(
        formData.newPassword
      );

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    try {
      await changePassword({
        currentPassword:
          formData.currentPassword,
        newPassword:
          formData.newPassword,
      });

      toast.success(
        "Password updated successfully. You have been logged out for security. Please sign in again."
      );

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
      }, 1800);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update password"
      );
    }
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="change-password-card">

          <h1>🔒 Change Password</h1>

          <p>
            Update your account password
            securely.
          </p>

          <form onSubmit={handleSubmit}>

            <label>
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={
                formData.currentPassword
              }
              onChange={handleChange}
              required
            />

            <label>
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />

            <label>
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              required
            />

            <button type="submit">
              Update Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ChangePassword;