import { useNavigate } from "react-router-dom";

import "./Table.css";

function Table({
  users = [],
}) {
  const navigate = useNavigate();

  return (
    <div className="table-card">

      <div className="table-header">

        <div>

          <h2>Recent Users</h2>

          <p>
            Latest registered users
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/users")
          }
        >
          View All
        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>User</th>

            <th>Email</th>

            <th>Role</th>

          </tr>

        </thead>

        <tbody>

          {users.length > 0 ? (

            users.map((user) => (

              <tr key={user.id}>

                <td>

                  <div className="user-cell">

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

                  <span
                    className={`role-badge ${user.role.toLowerCase()}`}
                  >
                    {user.role}
                  </span>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="3"
                className="empty-state"
              >
                No recent users found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Table;