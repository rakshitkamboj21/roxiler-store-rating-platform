/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";

import Sidebar from "../../../components/Sidebar/Sidebar";
import Navbar from "../../../components/Navbar/Navbar";
import UserTable from "../../../components/UserTable/UserTable";
import UserModal from "../../../components/UserModal/UserModal";
import ViewUserModal from "../../../components/UserModal/ViewUserModal";

import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/users";

import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("id");
  const [order, setOrder] = useState("ASC");

  // Add/Edit Modal
  const [openModal, setOpenModal] = useState(false);

  // View Modal
  const [viewOpen, setViewOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [editingUser, setEditingUser] = useState(null);

  // =========================
  // Fetch Users
  // =========================
  const fetchUsers = async () => {
    try {
      const response = await getUsers(
        search,
        sortBy,
        order
      );

      setUsers(response.users);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, sortBy, order]);

  // =========================
  // Save User
  // =========================
  const handleSaveUser = async (userData) => {
    try {
      if (editingUser) {
        await updateUser(
          editingUser.id,
          userData
        );

        toast.success(
          "User Updated Successfully!"
        );
      } else {
        await createUser(userData);

        toast.success(
          "User Added Successfully!"
        );
      }

      setEditingUser(null);

      setOpenModal(false);

      fetchUsers();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  // =========================
  // View User
  // =========================
  const handleView = async (id) => {
    try {
      const user = await getUserById(id);

      setSelectedUser(user);

      setViewOpen(true);
    } catch (err) {
      console.error(err);

      toast.error("Failed to load user");
    }
  };

  // =========================
  // Edit User
  // =========================
  const handleEdit = (user) => {
    setEditingUser(user);

    setOpenModal(true);
  };

  // =========================
  // Delete User
  // =========================
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);

      toast.success(
        "User Deleted Successfully!"
      );

      fetchUsers();
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
            <h1>Users</h1>

            <p>
              Manage all registered users.
            </p>
          </div>

          <button
            className="add-user-btn"
            onClick={() => {
              setEditingUser(null);

              setOpenModal(true);
            }}
          >
            <FaPlus />

            Add User
          </button>
        </div>

        {/* Search */}

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search users..."
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
            <option value="id">ID</option>

            <option value="name">
              Name
            </option>

            <option value="email">
              Email
            </option>

            <option value="address">
              Address
            </option>

            <option value="role">
              Role
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

        {/* Table */}

        <UserTable
          users={users}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Add / Edit */}

        <UserModal
          isOpen={openModal}
          user={editingUser}
          onClose={() => {
            setOpenModal(false);

            setEditingUser(null);
          }}
          onSave={handleSaveUser}
        />

        {/* View */}

        <ViewUserModal
          isOpen={viewOpen}
          user={selectedUser}
          onClose={() =>
            setViewOpen(false)
          }
        />
      </div>
    </div>
  );
}

export default Users;