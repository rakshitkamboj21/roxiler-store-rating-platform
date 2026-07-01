import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaStore,
  FaShieldAlt,
  FaDatabase,
  FaChartLine,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Button from "../../components/Button/Button";
import api from "../../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful!");

      const role = response.data.user.role;

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (
          role === "STORE_OWNER"
        ) {
          navigate("/owner/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }, 500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* LEFT PANEL */}

      <motion.div
        className="login-left"
        initial={{
          x: -80,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="brand">
          <div className="brand-logo">
            <FaStore />
          </div>

          <h1>Store Rating Platform</h1>

          <p>
            Manage stores, users and ratings
            with a modern, secure and
            professional platform.
          </p>

          <div className="features">
            <div className="feature">
              <FaShieldAlt />
              <span>
                Secure JWT Authentication
              </span>
            </div>

            <div className="feature">
              <FaDatabase />
              <span>
                PostgreSQL Database
              </span>
            </div>

            <div className="feature">
              <FaChartLine />
              <span>
                Analytics Dashboard
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}

      <motion.div
        className="login-right"
        initial={{
          x: 80,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Sign in to continue to your
            dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="input-wrapper">
                <FaLock className="input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <p className="register-link">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;