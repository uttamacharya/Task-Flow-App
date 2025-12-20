import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css"; // import as object
import { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utills/utills";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setLoginInfo(copyloginInfo);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Email and password are required')
    }
    try {
      const url = 'http://localhost:5000/api/auth/login'
      const { data } = await axios.post(url, loginInfo, {
        headers: { "Content-Type": "application/json" }
      });
      const { success, message, jwtToken, userName, error } = data;
      if (success) {
        handleSuccess(message || "login successfully");
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', userName);
      }
      else if (error) {
        const details = error?.details?.[0]?.message;
        handleError(details);
      }
      else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.response?.data?.message || err.message || "Something went wrong");
    }
  }

  return (
    <>
      <div className={styles.authWrapper}>
        <div className={styles.container}>
          <h1>Login</h1>
          <form>

            <div>
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Enter Your Email..."
                value={loginInfo.email}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="Enter Your Password..."
                value={loginInfo.email}
              />
            </div>

            <button type="submit">Register</button>
            <span>You don't have an account? please signup
              <Link to="/register">register</Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </div>

    </>
  );
}

export default Login;
