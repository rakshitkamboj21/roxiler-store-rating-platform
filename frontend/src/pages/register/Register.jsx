import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaStore,
  FaEnvelope,
  FaLock,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Button from "../../components/Button/Button";
import api from "../../services/api";
import "./Register.css";
import {
  validateName,
  validateEmail,
  validateAddress,
  validatePassword,
} from "../../utils/validation";
function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
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
  // Frontend Validation
  // =========================

  const nameError = validateName(formData.name);

  if (nameError) {
    toast.error(nameError);
    return;
  }

  const emailError = validateEmail(formData.email);

  if (emailError) {
    toast.error(emailError);
    return;
  }

  const addressError = validateAddress(
    formData.address
  );

  if (addressError) {
    toast.error(addressError);
    return;
  }

  const passwordError = validatePassword(
    formData.password
  );

  if (passwordError) {
    toast.error(passwordError);
    return;
  }

  setLoading(true);

  try {
    await api.post("/auth/register", formData);

    toast.success("Registration Successful!");

    setTimeout(() => {
      navigate("/");
    }, 700);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Registration Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">

      <motion.div
        className="login-left"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="brand">

          <div className="brand-logo">
            <FaStore />
          </div>

          <h1>Store Rating Platform</h1>

          <p>
            Create your account and start rating
            stores.
          </p>

        </div>
      </motion.div>

      <motion.div
        className="login-right"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <div className="login-card">

          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>Name</label>

              <div className="input-wrapper">
                <FaUser className="input-icon" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>

            </div>

            <div className="input-group">

              <label>Email</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>

            </div>

            <div className="input-group">

              <label>Password</label>

              <div className="input-wrapper">
                <FaLock className="input-icon" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

            </div>

            <div className="input-group">

              <label>Address</label>

              <div className="input-wrapper">
                <FaMapMarkerAlt className="input-icon" />

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  required
                />
              </div>

            </div>

            <Button
              type="submit"
              loading={loading}
            >
              Register
            </Button>

          </form>

          <p className="register-link">

            Already have an account?

            <Link to="/">
              Login
            </Link>

          </p>

        </div>
      </motion.div>

    </div>
  );
}

export default Register;