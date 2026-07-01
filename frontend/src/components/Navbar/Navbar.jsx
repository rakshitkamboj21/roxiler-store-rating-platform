import { FaUserCircle } from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const roleName =
    user?.role === "ADMIN"
      ? "Administrator"
      : user?.role === "STORE_OWNER"
      ? "Store Owner"
      : "User";

  return (
    <header className="navbar">

      <div className="navbar-title">

        <h2>Dashboard</h2>

        <p>
          Welcome back, {user?.name} 👋
        </p>

      </div>

      <div className="navbar-right">

        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div>
            <h4>{user?.name}</h4>
            <p>{roleName}</p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;