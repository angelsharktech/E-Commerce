import React from 'react'
import Header from '../pages/Header'
import { Box, Button, Stack, TextField } from '@mui/material'
import './Login.css'

const Login = () => {
  return (
    <>
    <Header />
          <div className='login-container'>
            <div className='box-style'>

            <h1 style={{ color: '#c26afc' }}>Login</h1>
            <form >
            <Stack  direction={'column'} spacing={2} style={{ justifyContent:'center',alignItems:'center',marginTop: '15px' }}>

              <TextField variant='standard' label='Email Address' name={'email'}  sx={{ width: 300 }} />
              <TextField variant='standard' label='Password' type='password' name={'password'}  sx={{ width: 300 }} />
              <Button variant='contained'  sx={{ backgroundColor: '#c26afc', color: 'white' }} onClick={() => addToCart()}>LOGIN</Button>
              <Button variant="text" sx={{  color: '#c26afc' }} onClick={() => signUp()}>Register For New User</Button>
              </Stack>

            </form>
            </div>
          </div>
    </>
    
  )
}

export default Login