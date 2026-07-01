import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/login/Login";

import AdminDashboard from "../pages/admin/Dashboard";
import OwnerDashboard from "../pages/owner/Dashboard";
import UserDashboard from "../pages/user/Dashboard";
import Register from "../pages/register/Register";
import Users from "../pages/admin/users/Users";
import Stores from "../pages/admin/stores/Stores";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
         />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/owner/dashboard"
          element={<OwnerDashboard />}
        />

        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />
        <Route
          path="/admin/users"
          element={<Users />}
        />
        <Route
          path="/admin/stores"
          element={<Stores />}
        />
        <Route
          path="/change-password"
         element={<ChangePassword />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;