import React, { useContext, useEffect } from 'react'
import Home from './Home'
import { userInformation } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignOut = () => {
     const { dispatch } = useContext(userInformation)
     const navigate = useNavigate()

    useEffect(() => {
      const logout = async () => {
      try {
        // Call backend to clear cookie
        await axios.post('/webuser/signout', {}, {
          withCredentials: true, // Important to include cookies
        });

        // Clear context / local state
        dispatch({ type: 'LOGOUT' });

        // Redirect
        navigate('/home');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

    logout();

    },[])
  return (
    <>
    <Home />
    </>
  )
}

export default SignOut