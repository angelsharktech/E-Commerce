import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {

  const [user, setUser] = useState({})
  const navigate = useNavigate();

  const registerUser = async() => {
    try {
      console.log(user);
      
      user.isAdmin = true
      const result = await axios.post('/user/register', user)
      if (result) {
        console.log(result);
        alert(result.data.msg)
        navigate('/')
      }

    } catch (error) {

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
    {/* Optional: faded overlay for better contrast */}
    <div className='background'/>
    <Box className='login-box'>
      <h1 style={{ color: '#c26afc', textAlign: 'center', marginBottom: 24, fontWeight: 700 }}>Register</h1>
      <TextField variant='outlined' label='Username' name='username' onChange={(e) => setUser({ ...user, username: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='Password' type='password' name='password' onChange={(e) => setUser({ ...user, password: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small'/>
      <TextField variant='outlined' label='Email' type='email' name='email' onChange={(e) => setUser({ ...user, email: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='Mobile Number' name='mob_no' onChange={(e) => setUser({ ...user, mob_no: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='Shop Name' name='shop_name' onChange={(e) => setUser({ ...user, shop_name: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='Shop Address' name='shop_address' onChange={(e) => setUser({ ...user, shop_address: e.target.value })} sx={{ mb: 2, width: '100%' }} size='small' />
      <TextField variant='outlined' label='GST Number' name='gst_no' onChange={(e) => setUser({ ...user, gst_no: e.target.value })} sx={{ mb: 3, width: '100%' }} size='small' />
      <Button
        variant='contained'
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
        onClick={registerUser}
      >
        Register
      </Button>
      <div style={{ width: '100%', textAlign: 'center', marginTop: 16 }}>
        <Link to={'/'} style={{ color: '#c26afc', textDecoration: 'none', fontWeight: 500 }}>
          BACK TO LOGIN
        </Link>
      </div>
    </Box>
  </div>
)
}

export default Register