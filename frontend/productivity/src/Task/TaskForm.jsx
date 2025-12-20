import React, { useState } from 'react';
import './TaskForm.css'

function TaskForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('3');

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
            status: "pending",
            createdAt: new Date()
        };
        onCreate(newTask)
        // ResetForm
        setTitle("");
        setDescription("");
        setPriority(3);
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
                    <tr></tr>
                    <label>priority{priority}</label>
                    <input
                        type='range'
                        min={1}
                        max={5}
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                    />
                    <button type='submit'> Create Task</button>
                </form>
                </div>
                
            )}

        </>
    )
}

export default TaskForm