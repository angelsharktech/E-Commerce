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
    <>
      <div className='background'>
        <Box
          sx={{
            width: '30%',
            marginRight: '10%',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            borderRadius: '12px'
          }}>
          <div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ color: '#dd25f5' }}>Register</h1>
            </div>

            <div className='login-style'>
              <TextField variant='standard' label='Username' name={'username'} onChange={(e) => setUser({ ...user, username: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='Password' type='password' name={'password'} onChange={(e) => setUser({ ...user, password: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='email' type='email' name={'email'} onChange={(e) => setUser({ ...user, email: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='Mobile Number' name={'mob_no'} onChange={(e) => setUser({ ...user, mob_no: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='Shop Name' name={'shop_name'} onChange={(e) => setUser({ ...user, shop_name: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='Shop Address' name={'shop_address'} onChange={(e) => setUser({ ...user, shop_address: e.target.value })} sx={{ width: 300 }} />
              <TextField variant='standard' label='GST Number' name={'gst_no'} onChange={(e) => setUser({ ...user, gst_no: e.target.value })} sx={{ width: 300 }} />
              <Button varient='contained' sx={{ backgroundColor: '#dd25f5', color: 'white' }} onClick={() => { registerUser() }}>Register</Button>
            </div>
            <div style={{ padding: '6%' }}>
              
              <Link to={'/'} style={{ color: '#dd25f5', marginLeft: '35%' }}>BACK TO LOGIN </Link>
            </div>
          </div>
        </Box>
      </div>
    </>
  )
}

export default Register