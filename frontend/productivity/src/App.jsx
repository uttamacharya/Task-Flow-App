import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/login";
import Dashboard from "../Dashboard/Dashboard";
import TaskPage from "./Task/TaskPage"
import TaskDetailsPage from "./Task/TaskDetails";
import AllPage from "../Common/LogByFilter/AllPage";
import RefreshHandler from "./utills/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAunthenticated] = useState(false)
  const privateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="./login" />
  }
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAunthenticated} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="tasks" />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
          <Route path="logs" element={<AllPage />} />
        </Route>
      </Routes>
    </>

  );
}

export default App;
