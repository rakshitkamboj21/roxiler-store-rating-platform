/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import {
  FaStar,
  FaUsers,
  FaStore,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { getOwnerDashboard } from "../../services/owner";

import "./Dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getOwnerDashboard();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboard) {
    return (
      <div className="dashboard">
        <Sidebar />

        <div className="dashboard-content">
          <Navbar />

          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  const validUsers =
    dashboard.users?.filter(
      (user) => user && user.name
    ) || [];

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        {/* Statistics */}

        <div className="stats-grid">

          <div className="stat-card">
            <h4>
              <FaStar /> Average Rating
            </h4>

            <h2>{dashboard.average_rating}</h2>
          </div>

          <div className="stat-card">
            <h4>
              <FaUsers /> Customers
            </h4>

            <h2>{validUsers.length}</h2>
          </div>

          <div className="stat-card">
            <h4>
              <FaStore /> My Store
            </h4>

            <h2>{dashboard.name}</h2>
          </div>

        </div>

        {/* Store Information */}

        <div className="owner-card">

          <h2>Store Information</h2>

          <div className="owner-info">

            <p>
              <strong>Store Name :</strong>{" "}
              {dashboard.name}
            </p>

            <p>
              <strong>Email :</strong>{" "}
              {dashboard.email}
            </p>

            <p>
              <strong>Address :</strong>{" "}
              {dashboard.address}
            </p>

            <p className="rating-value">
              ⭐ Average Rating :{" "}
              {dashboard.average_rating}
            </p>

          </div>

        </div>

        {/* Ratings */}

        <div className="ratings-card">

          <h2>Customers Who Rated</h2>

          {validUsers.length === 0 ? (

            <div className="empty-state">

              <FaStar
                size={40}
                color="#f59e0b"
              />

              <h3>No Ratings Yet</h3>

              <p>
                Your customers haven't rated
                your store yet.
              </p>

            </div>

          ) : (

            <table className="ratings-table">

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Rating</th>

                </tr>

              </thead>

              <tbody>

                {validUsers.map(
                  (user, index) => (

                    <tr key={index}>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        ⭐ {user.rating}/5
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;