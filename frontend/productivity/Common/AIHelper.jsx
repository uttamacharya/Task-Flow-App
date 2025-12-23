import React, { useState } from "react";
import axiosInstance from "../Common/axiosInstance";

function AIHelper({ taskId }) {
  const [logText, setLogText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetSuggestion = async () => {
    if (!logText.trim()) return;

    setLoading(true);
    setSuggestion("");

    try {
      const res = await axiosInstance.post("/ai/suggest", {
        taskId,
        logText,
      });
      setSuggestion(res.data.suggestion);
    } catch (err) {
      console.error("AI suggestion error:", err);
      setSuggestion("Failed to fetch suggestion. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", marginTop: "20px" }}>
      <h3>AI Task Helper</h3>
      <textarea
        value={logText}
        onChange={(e) => setLogText(e.target.value)}
        placeholder="Describe your task or log here..."
        rows={4}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleGetSuggestion} disabled={loading}>
        {loading ? "Loading..." : "Get AI Suggestion"}
      </button>

      {suggestion && (
        <div style={{ marginTop: "15px", background: "#f0f0f0", padding: "10px" }}>
          <strong>Suggestion:</strong>
          <p>{suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default AIHelper;
