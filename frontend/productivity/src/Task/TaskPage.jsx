import React from 'react'
import './TaskPage.css'
import TaskForm from './TaskForm'
import TaskList from './TaskList'
import { useState, Link } from 'react';

function TaskPage() {
    const [tasks, setTasks] = useState([]);

    // TaskForm se aayega
    const addTask = (newTask) => {
        setTasks(prev => [newTask, ...prev]);
    };
    return (
        <div className="Task-container">
            <div className="item">
                <TaskForm onCreate={addTask} />

                {/* Task cards */}
                <TaskList tasks={tasks} />
            </div>
        </div>
    )
}

export default TaskPage