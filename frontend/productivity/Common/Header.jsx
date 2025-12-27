import React, { useState } from 'react'
import './Header.css'
import Profile from './profile'
import { Link, useNavigate } from "react-router-dom";

function Header() {

    const [open, setOpen] = useState(false)

    return (
        <div className="navbar">
            <h3>Productivity-app</h3>

            {/* Desktop menu */}
            <div className="navbar-item">
                <span>
                    <Link to="/dashboard">Dashboard</Link>
                </span>
                <span><Link to="/dashboard/tasks">Task</Link></span>
                <span>
                    <Link to="/dashboard/AllPage">Logs</Link>
                </span>

                <span>Setting</span>
                <span>
                    <Profile></Profile>
                </span>
            </div>

            {/* Mobile icon */}
            <div className="icon" onClick={() => setOpen(true)}>☰</div>

            {/* Mobile sidebar */}
            <div className={`sidebar ${open ? "open" : ""}`}>
                <span className="close" onClick={() => setOpen(false)}>✖</span>

                <span><Link to="/dashboard">Dashboard</Link></span>
                <span ><Link to="/dashboard/tasks">Task</Link></span>
                <span><Link to="/dashboard/logs">Logs</Link></span>
                <span>Setting</span>
                <span ><Profile></Profile></span>
            </div>
        </div>
    )
}

export default Header
