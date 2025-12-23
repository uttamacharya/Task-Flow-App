import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../Common/axiosInstance";
import LogPage from "../DailyLog/LogPage";
import AIHelper from "../../Common/AIHelper";
// import "./TaskDetailsPage.css";

function TaskDetails() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;

    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/tasks/${taskId}`);
        console.log("TaskDetailsPage taskId:", taskId);
        setTask(res.data.task);
      } catch (err) {
        console.error("Fetch task error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found</p>;

  return (
    <div className="task-details-container">
      <button onClick={() => navigate("/dashboard/tasks")}>
        ← Back to Tasks
      </button>
      <h2>{task.title}</h2>
      {task.description && <p>{task.description}</p>}
      <p>
        Status: <strong>{task.status}</strong>
      </p>
      <p>
        Priority: <strong>P{task.priority}</strong>
      </p>
      <hr />
      {/* Render daily logs for this task */}
      <LogPage taskId={taskId} />
      {/* AI Helper */}
      <AIHelper taskId={taskId} />
    </div>
  );
}

export default TaskDetails;
