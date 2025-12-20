import React from "react";
import TaskCard from "./TaskCard";
import "./TaskList.css";

function TaskList({ tasks }) {

  // 🟡 Jab koi task hi nahi hai
  if (!tasks || tasks.length === 0) {
    return (
      <div className="no-task">
        <p>No tasks yet</p>
        <span>Create your first task 🚀</span>
      </div>
    );
  }

  // 🟢 Jab tasks available ho
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
        />
      ))}
    </div>
  );
}

export default TaskList;
