import React from 'react'
import { useEffect } from 'react'
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setIsAuthenticated}) {
    const location= useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            setIsAuthenticated(true);

            if(location.pathname==='/' ||
                location.pathname==='/login' ||
                location.pathname==='.register' &&
                location.pathname==='dashboard'
            ){
                navigate('/dashboard', {replace: true});
            }else{
                setIsAuthenticated(false);
                if(location.pathname==='/dashboard'){
                    navigate('/login', {replace: true})
                }
            }
        }
    }, [location, setIsAuthenticated, navigate])
  return null;
  
}

export default RefreshHandler