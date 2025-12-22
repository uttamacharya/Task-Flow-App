import React from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../src/utills/utills'

function Logout() {
    const navigate = useNavigate();
    function handleLogOut(e) {
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess(' user Loggedout')
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    };
    const buttonStyle = {
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "5px"
        };
    return (
        <>
            <button onClick={handleLogOut} style={buttonStyle}>Logout</button>
        </>
    )
}

export default Logout