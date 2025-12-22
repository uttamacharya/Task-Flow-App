import React from "react";
import { useNavigate } from "react-router-dom";
import "./TaskCard.css";

function TaskCard({ task }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Task clicked:", task._id);
    navigate(`/dashboard/tasks/${task._id}`);
  };

  return (
    <div className="task-card" onClick={handleClick}>
      {/* ===== HEADER ===== */}
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>

        <span className={`priority p${task.priority}`}>
          P{task.priority}
        </span>
      </div>

      {/* ===== DESCRIPTION ===== */}
      {task.description && (
        <p className="task-desc">
          {task.description.length > 80
            ? task.description.slice(0, 80) + "..."
            : task.description}
        </p>
      )}

      {/* ===== FOOTER ===== */}
      <div className="task-card-footer">
        <span className={`status ${task.status?.toLowerCase()}`}>
          {task.status}
        </span>

        <span className="date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
