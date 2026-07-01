import "./ViewUserModal.css";

function ViewUserModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="view-modal-overlay">
      <div className="view-modal">

        <h2>User Details</h2>

        <div className="detail-row">
          <span>Name</span>
          <strong>{user.name}</strong>
        </div>

        <div className="detail-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="detail-row">
          <span>Address</span>
          <strong>{user.address}</strong>
        </div>

        <div className="detail-row">
          <span>Role</span>
          <strong>{user.role}</strong>
        </div>

        {user.role === "STORE_OWNER" && (
          <div className="detail-row">
            <span>Average Rating</span>
            <strong>{user.rating}</strong>
          </div>
        )}

        <button
          className="close-btn"
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default ViewUserModal;