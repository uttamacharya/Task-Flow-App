import React from "react";
import LogCard from "./LogCard";
import "./LogList.css";

function LogList({logs = [], onEdit, onDelete}) {
  if (logs.length === 0) {
    return <p>No logs yet.</p>;
  }

  return (
    <div className="logList">
      {logs.map((log) => (
        // console.log("LOG:", log),
        <LogCard
          key={log._id }
          log={log}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default LogList;
