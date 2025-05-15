import React, { useContext, useEffect } from 'react'
import Home from './Home'
import { userInformation } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
     const { dispatch } = useContext(userInformation)
     const navigate = useNavigate()
    useEffect(() => {
     
      dispatch({ type: 'LOGOUT' })
    navigate('/home')
 
    },[])
  return (
    <>
    <Home />
    </>
  )
}

export default SignOut