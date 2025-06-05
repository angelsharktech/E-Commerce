
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import './Login-Style.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { userInformation } from '../context/AuthContext';

const Login = () => {
    const {users} = useContext(userInformation)
    const { dispatch } = useContext(userInformation)
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate()

    const handleChange = async (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const getAuthorize = async () => {
        try {
            const result = await axios.post('/user/login', loginData)
            
                if (result.data.msg === 'Login Successfully') {
                    
                dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.details })
                 result.data.details  ? navigate('/dashboard') : alert(result.data.msg)
            }
             else {
                alert(result.data.msg)
            }
        } catch (error) {
            // users.dispatch({type: "LOGIN_FAILURE",
            //     payload: error.response.data.message,
            // });
            console.log(error);
            
        }
    }
   return (
    <div
    style={{
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 150,
    overflow: 'hidden',
  }}
>
  <div className='background' />
    <Box className='login-box'>
      <Typography variant="h4" fontWeight={700} color="#c26afc" mb={3} textAlign="center">
        Login
      </Typography>
      <TextField
        variant='outlined'
        label='Username'
        name='username'
        onChange={handleChange}
        sx={{ mb: 2, width: '100%' }}
      />
      <TextField
        variant='outlined'
        label='Password'
        type='password'
        name='password'
        onChange={handleChange}
        sx={{ mb: 3, width: '100%' }}
      />
      <Button
        variant='contained'
        onClick={getAuthorize}
        sx={{
          background: 'linear-gradient(90deg, #c26afc 0%, #177bad 100%)',
          color: 'white',
          fontWeight: 600,
          width: '100%',
          mb: 2,
          boxShadow: 2,
          '&:hover': {
            background: 'linear-gradient(90deg, #177bad 0%, #c26afc 100%)',
          },
        }}
      >
        LOGIN
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        <Link to={'/register'} style={{ color: '#c26afc', textDecoration: 'none', fontWeight: 500 }}>
          SIGN UP FOR NEW USER
        </Link>
      </Typography>
    </Box>
  </div>
)
}

export default Login