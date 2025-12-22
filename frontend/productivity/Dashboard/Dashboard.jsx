import React from "react";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";
import Header from "../Common/Header";
import TaskPage from "../src/Task/TaskPage";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      {/* 👇 Yahan page render hoga */}
      <Outlet />
      {/* <TaskPage></TaskPage> */}
    </div>
  );
};

export default Dashboard;
