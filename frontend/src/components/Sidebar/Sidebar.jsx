import {
  FaStore,
  FaChartPie,
  FaUsers,
  FaWarehouse,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const panelName =
    user?.role === "ADMIN"
      ? "Admin Panel"
      : user?.role === "STORE_OWNER"
      ? "Store Owner Panel"
      : "User Panel";

  const dashboardRoute =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "STORE_OWNER"
      ? "/owner/dashboard"
      : "/user/dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}

      <div className="sidebar-logo">

        <div className="logo-box">
          <FaStore />
        </div>

        <div>

          <h2>Store Rating</h2>

          <p>{panelName}</p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="sidebar-menu">

        <Link to={dashboardRoute}>
          <FaChartPie />
          Dashboard
        </Link>

        {user?.role === "ADMIN" && (
          <>
            <Link to="/admin/users">
              <FaUsers />
              Users
            </Link>

            <Link to="/admin/stores">
              <FaWarehouse />
              Stores
            </Link>
          </>
        )}

        <Link to="/change-password">
          <FaCog />
          Change Password
        </Link>

      </nav>

      {/* Footer */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;