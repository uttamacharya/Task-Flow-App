import React, { useState } from "react";
import "./LogCard.css";

function LogCard({ log, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState(log.comments || "");
  const [duration, setDuration] = useState(log.duration);
  const [rating, setRating] = useState(log.rating);

  const saveHandler = () => {
    onEdit(log._id, {
      comments,
      duration,
      rating
    });
    setOpen(false);
  };
  const formattedDate = new Date(log.date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });


  return (
    <div className="logCard">
      <div className="logCardHeader" onClick={() => setOpen(!open)}>
        <span>{duration} hrs</span>
        <span className="logDate">{formattedDate}</span>
        <span>⭐ {rating}</span>

      </div>

      {open && (
        <div className="logCardBody">
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
          <input type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />

          <div className="ratingGroup">
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n}>
                <input
                  type="radio"
                  checked={rating === n}
                  onChange={() => setRating(n)}
                />
                {n}
              </label>
            ))}
          </div>

          <div className="logActions">
            <button onClick={saveHandler}>Save</button>
            <button className="danger" onClick={() => onDelete(log._id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LogCard;
