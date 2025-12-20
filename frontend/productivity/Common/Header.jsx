import React, { useState } from 'react'
import './Header.css'
import Profile from './profile'

function Header() {

    const [open, setOpen] = useState(false)

    return (
        <div className="navbar">
            <h3>Productivity-app</h3>

            {/* Desktop menu */}
            <div className="navbar-item">
                <span>Dashboard</span>
                <span>Task</span>
                <span>Sections</span>

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

                <span>Dashboard</span>
                <span>Task</span>
                <span>Sections</span>
                <span>Setting</span>
                <span ><Profile></Profile>Profile</span>
            </div>
        </div>
    )
}

export default Header
