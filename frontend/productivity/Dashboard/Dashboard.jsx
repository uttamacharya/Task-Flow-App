import React from 'react';
import './Dashboard.css';
import Header from '../Common/Header';
import TaskPage from '../src/Task/TaskPage';

const Dashboard = () => {
  return (
    <div className="dashboard">
        <Header></Header>
        <TaskPage></TaskPage>
    </div>
  );
};

export default Dashboard;