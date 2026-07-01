/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
} from "../../utils/validation";

import "./UserModal.css";

function UserModal({
  isOpen,
  onClose,
  onSave,
  user,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        address: user.address,
        role: user.role,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // =========================
    // Name Validation
    // =========================
    const nameError = validateName(
      formData.name
    );

    if (nameError) {
      toast.error(nameError);
      return;
    }

    // =========================
    // Email Validation
    // =========================
    const emailError = validateEmail(
      formData.email
    );

    if (emailError) {
      toast.error(emailError);
      return;
    }

    // =========================
    // Address Validation
    // =========================
    const addressError =
      validateAddress(formData.address);

    if (addressError) {
      toast.error(addressError);
      return;
    }

    // =========================
    // Password Validation
    // Only while creating user
    // =========================
    if (!user) {
      const passwordError =
        validatePassword(
          formData.password
        );

      if (passwordError) {
        toast.error(passwordError);
        return;
      }
    }

    onSave(formData);
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {user ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!user && (
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="ADMIN">
              ADMIN
            </option>

            <option value="STORE_OWNER">
              STORE OWNER
            </option>

            <option value="USER">
              USER
            </option>
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default UserModal;