import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import axios from "axios";
import { handleError, handleSuccess } from "../utills/utills";
import { useNavigate, Link } from "react-router-dom";


function Register() {
  const navigate = useNavigate();

  // State aligned with backend model
  const [registerInfo, setRegisterInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, password } = registerInfo;

    if (!userName || !email || !password) {
      return handleError("Username, Email and Password required");
    }

    try {
      const url = "http://localhost:5000/api/auth/signup";
      const { data } = await axios.post(url, registerInfo, {
        headers: { "Content-Type": "application/json" },
      });

      const { success, message, error } = data;

      if (success) {
        handleSuccess(message || "Register successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.container}>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              autoFocus
              placeholder="Enter Your Username..."
              value={registerInfo.userName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email..."
              value={registerInfo.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password..."
              value={registerInfo.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Register</button>
          <span>You have already have an account, please Login
            <Link to="/login">login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
