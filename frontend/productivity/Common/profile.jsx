import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  const user = {
    name: "Uttam Acharya",
    email: "uttam@gmail.com",
  };

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
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
