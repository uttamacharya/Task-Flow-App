import React, { useState, useEffect } from 'react';
import './TaskPage.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios';
import axiosInstance from '../../Common/axiosInstance';

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    // const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get("/tasks");
            // console.log("Fetched tasks:", res.data.tasks);
            setTasks(res.data.tasks);
        } catch (err) {
            console.error("Fetch tasks error:", err);
        }
    };

    const addTask = async (taskData) => {
        try {
            const res = await axiosInstance.post("/tasks", taskData);
            setTasks(prev => [res.data.task, ...prev]);
        } catch (err) {
            console.error("Add task error:", err);
        }
    };
    const handleEditClick = (task) => {
        setTaskToEdit(task);
    };


    const updateTask = async (taskId, updatedData) => {
        try {
            const res = await axiosInstance.put(
                `/tasks/${taskId}`,
                updatedData
            );

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? res.data.task : task
                )
            );

            setTaskToEdit(null); // edit complete
        } catch (err) {
            console.error("Update task error:", err);
        }
    };


    return (
        <div className="Task-container">
            <div className="item">
                <TaskForm onCreate={addTask}
                    onUpdate={updateTask}
                    taskToEdit={taskToEdit} />
                <TaskList
                    tasks={tasks}
                    onEdit={handleEditClick} />
            </div>
            <ToastContainer />
        </div>
    );
}

export default TaskPage;
