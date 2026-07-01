import { useState } from "react";
import "./RatingModal.css";

function RatingModal({
  isOpen,
  onClose,
  store,
  onSubmit,
}) {
  const [rating, setRating] = useState(
    store?.user_rating || 1
  );

  if (!isOpen || !store) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(store.id, Number(rating));

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Rate Store</h2>

        <h3>{store.name}</h3>

        <form onSubmit={handleSubmit}>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>

          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Rating
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default RatingModal;