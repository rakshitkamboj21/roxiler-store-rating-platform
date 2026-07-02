/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import StatsCard from "../../components/StatsCard/StatsCard";
import Table from "../../components/Table/Table";
import Chart from "../../components/Chart/Chart";

import { getDashboardStats } from "../../services/dashboard";

import {
  FaUsers,
  FaStore,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
    averageRating: 0,
    recentUsers: [],
    recentStores: [],
  });

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(
        "Failed to fetch dashboard:",
        error
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        {/* Statistics */}

        <div className="stats-grid">

          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<FaUsers />}
            color="#2563EB"
          />

          <StatsCard
            title="Total Stores"
            value={stats.totalStores}
            icon={<FaStore />}
            color="#10B981"
          />

          <StatsCard
            title="Ratings"
            value={stats.totalRatings}
            icon={<FaStar />}
            color="#F59E0B"
          />

          <StatsCard
            title="Average Rating"
            value={stats.averageRating}
            icon={<FaChartLine />}
            color="#8B5CF6"
          />

        </div>

        {/* Dashboard Grid */}

        <div className="dashboard-grid">

          <Table
            users={stats.recentUsers}
          />

          <Chart
  totalUsers={stats.totalUsers}
  totalStores={stats.totalStores}
  totalRatings={stats.totalRatings}
  averageRating={stats.averageRating}
/>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;