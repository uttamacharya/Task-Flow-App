import React, { useState } from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './TaskForm.css'

function TaskForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('3');
    const [status, setStatus] = useState('pending');

    const [open, setOpen] = useState(false);

    // Click outside form to close
    const submitHandler = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newTask = {
            _id: Date.now().toString(),
            title,
            description,
            priority,
            status,
            createdAt: new Date()
        };
        onCreate(newTask)
        // ResetForm
        setTitle("");
        setDescription("");
        setPriority(3);
        setStatus('pending');
        setOpen(false); // modal close
    }
    return (
        <>
            <div className="TaskFormIcon" onClick={() => setOpen(true)}>+ Create Task</div>
            {open && (
                <div className="formOverlayer">
                    <form className="taskForm" onSubmit={submitHandler}>
                        <span className="close" onClick={() => setOpen(false)}>✖</span>
                        <h3>Create Task</h3>
                        <input
                            type="text"
                            placeholder="task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder='Describe how will you do this work'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        
                        <label>priority{priority}</label>
                        <input
                            type='range'
                            min={1}
                            max={5}
                            value={priority}
                            onChange={(e) => setPriority(Number(e.target.value))}
                        />
                        <select
                            name="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Pending">Pending</option>
                            <option value="In-Process">In Process</option>
                            <option value="Completed">Completed</option>
                        </select>
                        <button type='submit'> Create Task</button>
                    </form>
                    <ToastContainer />
                </div>

            )}

        </>
    )
}

export default TaskForm