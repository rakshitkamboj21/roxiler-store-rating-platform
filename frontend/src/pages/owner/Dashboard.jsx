/* eslint-disable react-hooks/immutability */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaStar,
  FaUsers,
  FaStore,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import StatsCard from "../../components/StatsCard/StatsCard";
import Chart from "../../components/Chart/Chart";

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

          <h2>Loading Dashboard...</h2>
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

  <StatsCard
    title="Average Rating"
    value={dashboard.average_rating}
    icon={<FaStar />}
    color="#F59E0B"
  />

  <StatsCard
    title="Customers"
    value={validUsers.length}
    icon={<FaUsers />}
    color="#10B981"
  />

  <StatsCard
    title="Store Name"
    value={dashboard.name}
    icon={<FaStore />}
    color="#2563EB"
  />

</div>

        {/* Information + Chart */}

        <div className="owner-grid">

          <motion.div
            className="owner-card"
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .5,
            }}
          >

            <h2>

              <FaStore />

              Store Information

            </h2>

            <div className="owner-info">

              <div>

                <FaStore />

                <span>
                  {dashboard.name}
                </span>

              </div>

              <div>

                <FaEnvelope />

                <span>
                  {dashboard.email}
                </span>

              </div>

              <div>

                <FaMapMarkerAlt />

                <span>
                  {dashboard.address}
                </span>

              </div>

              <div className="rating-row">

                <FaStar />

                <span>

                  {dashboard.average_rating} / 5

                </span>

              </div>

            </div>

          </motion.div>

          <Chart
  owner={true}
  totalUsers={validUsers.length}
  totalRatings={validUsers.length}
  averageRating={Number(
    dashboard.average_rating
  )}
/>

        </div>

        {/* Ratings */}

        <motion.div
          className="ratings-card"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: .2,
          }}
        >

          <h2>

            Customer Ratings

          </h2>

          {validUsers.length === 0 ? (

            <div className="empty-state">

              <FaStar
                size={45}
                color="#F59E0B"
              />

              <h3>

                No Ratings Yet

              </h3>

              <p>

                Customers haven't rated your
                store yet.

              </p>

            </div>

          ) : (

            <table className="ratings-table">

              <thead>

                <tr>

                  <th>User</th>

                  <th>Email</th>

                  <th>Rating</th>

                </tr>

              </thead>

              <tbody>

                {validUsers.map(
                  (
                    user,
                    index
                  ) => (

                    <tr key={index}>

                      <td>

                        <div className="customer">

                          <div className="avatar">

                            {user.name.charAt(0)}

                          </div>

                          <span>

                            {user.name}

                          </span>

                        </div>

                      </td>

                      <td>

                        {user.email}

                      </td>

                      <td>

                        <span className="rating-badge">

                          ⭐ {user.rating}/5

                        </span>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </motion.div>

      </div>

    </div>
  );
}

export default Dashboard;