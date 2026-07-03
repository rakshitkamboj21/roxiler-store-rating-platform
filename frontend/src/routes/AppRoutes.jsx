import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/login/Login";
import Register from "../pages/register/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import UserDashboard from "../pages/user/Dashboard";

import Users from "../pages/admin/users/Users";
import Stores from "../pages/admin/stores/Stores";

import ChangePassword from "../pages/ChangePassword/ChangePassword";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Admin */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute
              allowedRole="ADMIN"
            >
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* Store Owner */}

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute
              allowedRole="STORE_OWNER"
            >
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* User */}

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute
              allowedRole="USER"
            >
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Shared */}

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;