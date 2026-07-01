import "./Table.css";

function Table() {
  const users = [
    {
      id: 1,
      name: "Rakshit",
      email: "rakshit@gmail.com",
      role: "ADMIN",
    },
    {
      id: 2,
      name: "John",
      email: "john@gmail.com",
      role: "STORE_OWNER",
    },
    {
      id: 3,
      name: "Demo User",
      email: "demo@test.com",
      role: "USER",
    },
  ];

  return (
    <div className="table-card">

      <div className="table-header">

        <h2>Recent Users</h2>

        <button>View All</button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Email</th>

            <th>Role</th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>

                <span className="role-badge">

                  {user.role}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Table;