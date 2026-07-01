import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./UserTable.css";

function UserTable({
  users,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="user-table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>

              <td>
                <strong> {user.id} </strong>
              </td>

              <td>
                <div className="user-info">

                  <div className="avatar">
                    {user.name.charAt(0)}
                  </div>

                  <span>{user.name}</span>

                </div>
              </td>

              <td>{user.email}</td>

              <td>{user.address}</td>

              <td>
                <span
                  className={`role ${user.role.toLowerCase()}`}
                >
                  {user.role}
                </span>
              </td>

              <td>
                <div className="actions">

                  <button
                    title="View"
                    onClick={() => onView(user.id)}
                  >
                    <FaEye />
                  </button>

                  <button
                    title="Edit"
                    onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete"
                    title="Delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete ${user.name}?`
                        )
                      ) {
                        onDelete(user.id);
                      }
                    }}
                  >
                    <FaTrash />
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;