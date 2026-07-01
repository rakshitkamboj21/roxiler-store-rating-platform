import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./StoreTable.css";

function StoreTable({
  stores,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="store-table-card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Store</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>

              <td>
                <strong>{store.id}</strong>
              </td>

              <td>
                <div className="store-info">

                  <div className="store-avatar">
                    {store.name.charAt(0)}
                  </div>

                  <span>{store.name}</span>

                </div>
              </td>

              <td>
                {store.owner_name || (
                  <span style={{ color: "#999" }}>
                    Not Assigned
                  </span>
                )}
              </td>

              <td>{store.email}</td>

              <td>{store.address}</td>

              <td>
                ⭐ {Number(store.rating).toFixed(2)}
              </td>

              <td>
                <div className="actions">

                  <button
                    title="View"
                    onClick={() => onView(store.id)}
                  >
                    <FaEye />
                  </button>

                  <button
                    title="Edit"
                    onClick={() => onEdit(store)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete"
                    title="Delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Delete ${store.name}?`
                        )
                      ) {
                        onDelete(store.id);
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

export default StoreTable;