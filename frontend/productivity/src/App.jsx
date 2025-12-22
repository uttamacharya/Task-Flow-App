import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/login";
import Dashboard from "../Dashboard/Dashboard";
import TaskPage from "./Task/TaskPage"
import TaskDetailsPage from "./Task/TaskDetails";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* 👇 Dashboard layout */}
      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Navigate to="tasks" />} />
        <Route path="tasks" element={<TaskPage />} />
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
