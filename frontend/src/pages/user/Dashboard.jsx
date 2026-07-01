/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import RatingModal from "../../components/RatingModal/RatingModal";

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

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="users-header">

          <div>
            <h1>Stores</h1>
            <p>Browse and rate stores.</p>
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

              <h4>
                ⭐ Overall Rating :
                {" "}
                {store.overall_rating}
              </h4>

              <h4>
                Your Rating :
                {" "}
                {store.user_rating ?? "Not Rated"}
              </h4>

              <button
                onClick={() => {
                  setSelectedStore(store);
                  setOpenModal(true);
                }}
              >
                {store.user_rating
                  ? "Update Rating"
                  : "Rate Store"}
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