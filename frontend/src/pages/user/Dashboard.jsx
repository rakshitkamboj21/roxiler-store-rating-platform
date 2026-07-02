/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import {
  FaSearch,
  FaStar,
  FaStore,
  FaBuilding,
} from "react-icons/fa";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import RatingModal from "../../components/RatingModal/RatingModal";
import StatsCard from "../../components/StatsCard/StatsCard";

import {
  getStores,
  addRating,
  updateRating,
} from "../../services/user";

import "./Dashboard.css";

function Dashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedStore, setSelectedStore] =
    useState(null);

  const [openModal, setOpenModal] =
    useState(false);

  const fetchStores = async () => {
    try {
      const response = await getStores();
      setStores(response.stores);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRating = async (
    storeId,
    rating
  ) => {
    try {
      const store = stores.find(
        (s) => s.id === storeId
      );

      if (store.user_rating) {
        await updateRating(storeId, rating);
      } else {
        await addRating(storeId, rating);
      }

      fetchStores();
    } catch (err) {
      alert("Unable to save rating.");
    }
  };

  const filteredStores = stores.filter(
    (store) =>
      store.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      store.address
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const ratedStores = stores.filter(
    (store) => store.user_rating
  );

  const averageRating =
    ratedStores.length > 0
      ? (
          ratedStores.reduce(
            (sum, store) =>
              sum +
              Number(store.user_rating),
            0
          ) / ratedStores.length
        ).toFixed(2)
      : 0;

  const renderStars = (rating) => {
    if (!rating) return "Not Rated";

    return (
      "★".repeat(rating) +
      "☆".repeat(5 - rating)
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <Navbar />

        {/* Stats */}

        <div className="stats-grid">

          <StatsCard
            title="My Average Rating"
            value={Number(averageRating)}
            icon={<FaStar />}
            color="#F59E0B"
          />

          <StatsCard
            title="Stores Rated"
            value={ratedStores.length}
            icon={<FaStore />}
            color="#10B981"
          />

          <StatsCard
            title="Available Stores"
            value={stores.length}
            icon={<FaBuilding />}
            color="#2563EB"
          />

        </div>

        <div className="users-header">

          <div>

            <h1>Stores</h1>

            <p>
              Browse and rate stores.
            </p>

          </div>

        </div>

        <div className="search-box">

          <FaSearch />

          <input
            placeholder="Search Stores..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="store-grid">

          {filteredStores.map((store) => (

            <div
              className="store-card"
              key={store.id}
            >

              <h3>{store.name}</h3>

              <p>{store.email}</p>

              <p>{store.address}</p>

              <div className="rating-box">

                <span>
                  Overall Rating
                </span>

                <strong>
                  ⭐{" "}
                  {store.overall_rating}
                </strong>

              </div>

              <div className="rating-box">

                <span>
                  Your Rating
                </span>

                <strong className="user-stars">

                  {store.user_rating
                    ? renderStars(
                        Number(
                          store.user_rating
                        )
                      )
                    : "Not Rated"}

                </strong>

              </div>

              <button
                onClick={() => {
                  setSelectedStore(store);
                  setOpenModal(true);
                }}
              >
                {store.user_rating
                  ? "✏ Update Rating"
                  : "⭐ Rate Store"}
              </button>

            </div>

          ))}

        </div>

        <RatingModal
          isOpen={openModal}
          store={selectedStore}
          onClose={() => setOpenModal(false)}
          onSubmit={handleRating}
        />

      </div>
    </div>
  );
}

export default Dashboard;