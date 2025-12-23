import React, { useEffect, useState } from "react";
import LogForm from "./LogForm";
import LogList from "./LogList";
import axiosInstance from "../../Common/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LogPage.css";

function LogPage({ taskId }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  //FETCH
  useEffect(() => {
    if (!taskId) return;

    const fetchLogs = async () => {
      try {
        const res = await axiosInstance.get(
          `/logs/tasks/${taskId}/logs`
        );
        setLogs(res.data.logs || []);
      } catch (err) {
        console.error("Fetch logs error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [taskId]);

  //CREATe 
  const addLog = async (logData) => {
    try {
      const res = await axiosInstance.post(
        `/logs/tasks/${taskId}/logs`,
        logData
      );
      setLogs((prev) => [res.data.log, ...prev]);
      toast.success("Log added successfully"); 
    } catch (err) {
      console.error("Create log error:", err);
      toast.error(err.response?.data?.message || "Failed to add log");
    }
  };

  //UPDATE
  const updateLog = async (logId, updatedData) => {
    try {
      const res = await axiosInstance.put(
        `/logs/${logId}`,
        updatedData
      );
      setLogs((prev) =>
        prev.map((log) =>
          log._id === logId ? res.data.log : log
        )
      );
      toast.success("Log updated successfully");
    } catch (err) {
      console.error("Update log error:", err);
      if(err.response){
        toast.error(err.response.data.message);
      }
      else{
        toast.error("Someting went wrong")
      }
    }
  };

  //DELETE
  const deleteLog = async (logId) => {
    try {
      await axiosInstance.delete(`/logs/${logId}`);
      setLogs((prev) =>
        prev.filter((log) => log._id !== logId)
      );
      toast.success("Log deleted successfully");
    } catch (err) {
      console.error("Delete log error:", err);
      toast.error("Failed to delete log");
    }
  };

  return (
    <div className="logPageContainer">
      <h2>Daily Work Logs</h2>

      <LogForm onCreate={addLog} />

      {loading ? (
        <p>Loading logs...</p>
      ) : (
        <LogList
          logs={logs}
          onEdit={updateLog}
          onDelete={deleteLog}
        />
      )}
      <ToastContainer/>
    </div>
  );
}

export default LogPage;
