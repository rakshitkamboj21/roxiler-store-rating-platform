/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import StoreTable from "../../../components/StoreTable/StoreTable";
import StoreModal from "../../../components/StoreModal/StoreModal";

import {
  getStores,
  createStore,
  getStoreById,
  updateStore,
  deleteStore,
  getStoreOwners,
} from "../../../services/stores";

import "./Stores.css";

function Stores() {
  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("ASC");

  const [openModal, setOpenModal] = useState(false);

  const [editingStore, setEditingStore] =
    useState(null);

  // =========================
  // Fetch Stores
  // =========================
  const fetchStores = async () => {
    try {
      const response = await getStores(
        search,
        sortBy,
        order
      );

      setStores(response.stores);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load stores");
    }
  };

  // =========================
  // Fetch Store Owners
  // =========================
  const fetchOwners = async () => {
    try {
      const data = await getStoreOwners();

      setOwners(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load store owners");
    }
  };

  useEffect(() => {
    fetchStores();
    fetchOwners();
  }, [search, sortBy, order]);

  // =========================
  // Add / Edit Store
  // =========================
  const handleSaveStore = async (
    storeData
  ) => {
    try {
      if (editingStore) {
        await updateStore(
          editingStore.id,
          storeData
        );

        toast.success(
          "Store Updated Successfully!"
        );
      } else {
        await createStore(storeData);

        toast.success(
          "Store Added Successfully!"
        );
      }

      setOpenModal(false);
      setEditingStore(null);

      fetchStores();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  // =========================
  // View Store
  // =========================
  const handleView = async (id) => {
    try {
      const store = await getStoreById(id);

      toast.info(
        `Store: ${store.name}
Email: ${store.email}
Address: ${store.address}
Rating: ${store.rating}`
      );
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load store details"
      );
    }
  };

  // =========================
  // Edit Store
  // =========================
  const handleEdit = async (store) => {
    try {
      const fullStore =
        await getStoreById(store.id);

      setEditingStore(fullStore);

      setOpenModal(true);
    } catch (err) {
      console.error(err);

      toast.error(
        "Failed to load store details"
      );
    }
  };

  // =========================
  // Delete Store
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteStore(id);

      toast.success(
        "Store Deleted Successfully!"
      );

      fetchStores();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="users-header">

          <div>

            <h1>Stores</h1>

            <p>
              Manage all registered stores.
            </p>

          </div>

          <button
            className="add-user-btn"
            onClick={() => {
              setEditingStore(null);
              setOpenModal(true);
            }}
          >
            <FaPlus />

            Add Store

          </button>

        </div>

        {/* Search */}

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search stores..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Sorting */}

        <div className="sort-container">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="id">
              ID
            </option>

            <option value="name">
              Name
            </option>

            <option value="email">
              Email
            </option>

            <option value="address">
              Address
            </option>

            <option value="rating">
              Rating
            </option>

          </select>

          <select
            value={order}
            onChange={(e) =>
              setOrder(e.target.value)
            }
          >
            <option value="ASC">
              Ascending
            </option>

            <option value="DESC">
              Descending
            </option>

          </select>

        </div>

        <StoreTable
          stores={stores}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <StoreModal
          isOpen={openModal}
          store={editingStore}
          owners={owners}
          onClose={() => {
            setOpenModal(false);
            setEditingStore(null);
          }}
          onSave={handleSaveStore}
        />

      </div>

    </div>
  );
}

export default Stores;