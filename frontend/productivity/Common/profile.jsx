import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Profile.css";
import Logout from "./Logout";

function Profile() {
   // Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "User";
  const email = user?.email || "user@email.com";

  const [open, setOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

  return (
    <>
      {/* PROFILE ICON */}
      <div className="profile-avatar" onClick={() => setOpen(true)}>
        {initials}
      </div>

      {/* PROFILE POPUP */}
      {open && (
        <div className="profile-overlay">
          <div className="profile-card">
            <span className="close" onClick={() => setOpen(false)}>✖</span>

            <div className="profile-big-avatar">{initials}</div>
            <h2>{name}</h2>
            <p>{email}</p>
            <Logout></Logout>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
