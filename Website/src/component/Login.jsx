import React, { useContext, useState } from 'react'
import Header from '../pages/Header'
import { Box, Button, Stack, TextField } from '@mui/material'
import './Login.css'
import axios from 'axios'
import { userInformation } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {dispatch} = useContext(userInformation)
  const navigate = useNavigate()
  const [cred, setCred] =useState({})


  const login = async() =>{
    try {
      const result = await axios.post('/webuser/login', cred)
            
                if (result.data.msg === 'Login Successfully') {
                    
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.details })
                 result.data.details  ? navigate('/home') : alert(result.data.msg)
            }
             else {
                alert(result.data.msg)
            }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
    <Header />
          <div className='login-container'>
            <div className='box-style'>

            <h1 style={{ color: '#c26afc' }}>Login</h1>
            <form >
            <Stack  direction={'column'} spacing={2} style={{ justifyContent:'center',alignItems:'center',marginTop: '15px' }}>

              <TextField variant='standard' label='Email Address' name={'email'}  onChange={(e) => setCred({ ...cred, email: e.target.value })}  sx={{ width: 300 }} />
              <TextField variant='standard' label='Password' type='password' name={'password'} onChange={(e) => setCred({ ...cred, password: e.target.value })} sx={{ width: 300 }} />
              <Button variant='contained'  sx={{ backgroundColor: '#c26afc', color: 'white' }} onClick={() => login()}>LOGIN</Button>
              {/* <Button variant="text" sx={{  color: '#c26afc' }} onClick={() => signUp()}>Register For New User</Button> */}
              </Stack>

            </form>
            </div>
          </div>
    </>
    
  )
}

export default Login