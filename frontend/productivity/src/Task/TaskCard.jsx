import React from "react";
import "./TaskCard.css";

function TaskCard({ task, onClick }) {
  return (
    <div className="task-card" onClick={() => onClick(task)}>
      
      {/* 🔹 Task Header */}
      <div className="task-card-header">
        <h4 className="task-title">{task.title}</h4>

        {/* Priority badge */}
        <span className={`priority p${task.priority}`}>
          P{task.priority}
        </span>
      </div>

      {/* 🔹 Short description (optional) */}
      {task.description && (
        <p className="task-desc">
          {task.description.length > 80
            ? task.description.slice(0, 80) + "..."
            : task.description}
        </p>
      )}

      {/* 🔹 Footer info */}
      <div className="task-card-footer">
        <span className={`status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>

        <span className="date">
          {new Date(task.createdAt || Date.now()).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;
