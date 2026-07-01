/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  validateName,
  validateEmail,
  validateAddress,
} from "../../utils/validation";

import "./StoreModal.css";

function StoreModal({
  isOpen,
  onClose,
  onSave,
  store,
  owners,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name,
        email: store.email,
        address: store.address,
        owner_id: store.owner_id,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });
    }
  }, [store]);

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
    // Owner Validation
    // =========================
    if (!formData.owner_id) {
      toast.error(
        "Please select a Store Owner."
      );
      return;
    }

    onSave({
      ...formData,
      owner_id: Number(formData.owner_id),
    });
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {store
            ? "Edit Store"
            : "Add Store"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Store Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Store Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Store Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          {/* Store Owner Dropdown */}

          <select
            name="owner_id"
            value={formData.owner_id}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Store Owner
            </option>

            {owners &&
              owners.map((owner) => (
                <option
                  key={owner.id}
                  value={owner.id}
                >
                  {owner.name}
                </option>
              ))}
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
              {store
                ? "Update"
                : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default StoreModal;