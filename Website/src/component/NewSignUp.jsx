import React, { useState } from 'react'
import Header from '../pages/Header'
import { Box, Button, Modal, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Close } from '@mui/icons-material'
import axios from 'axios'

const NewSignUp = () => {
  const [open, setOpen] = useState(false);
  const [mobNo, setMobNo] = useState({ phone: '', otp: '' });
  const { register, handleSubmit } = useForm()

  const getOtp = async () => {
    try {
      console.log('mobNo:', mobNo);
      if (!mobNo.phone) {
        alert('Please enter a valid mobile number');
        return;
      }else{
        setOpen(true);
        alert('OTP sent to your mobile number');
        console.log('mobNo:', mobNo);
        
        const result = await axios.post(`/auth/sendotp`, { phone: mobNo.phone });
      }
    } catch (error) {
      console.log(error);
    }
  }
  const signUpUser = async() => {
    try {
       console.log('mobNo:', mobNo);
        
        const result = await axios.post(`/auth/verifyotp`, mobNo);
        console.log('result:', result);
        
    } catch (error) {  
      console.log(error);
    }
  }
  return (
    <>
      <Header />
      <div className='signup-container'>
        <div className='box-style'>
          <h1 style={{ color: '#fc94af' }}>SignUP</h1>
          {/* <form> */}
          <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
            <TextField variant='standard' label='Mobile Number' name={'mob_no'}  onChange={(e) => setMobNo({ ...mobNo, phone: e.target.value })} sx={{ width: 300 }} required />
            <Button variant='contained' sx={{ backgroundColor: '#fc94af', color: 'white' }} type='submit' onClick={() => getOtp()}>Sign Up</Button>
          </Stack>
          {/* </form> */}
        </div>

      </div >
      <Modal open={open} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <div >
          <Box sx={{ color: 'black', mt: '55%', p: '20px', border: '3px solid white', borderRadius: '20px', backgroundColor: '#fcf6eb', justifyContent: 'center', alignContent: 'center' }}  >
        <div style={{ textAlign: 'right' }}>
          <Button onClick={() => setOpen(false)}> <Close /> </Button>
        </div>
            <h1 style={{ color: '#fc94af' }}>SignUP</h1>
            {/* <form onSubmit={handleSubmit(signUpUser)}> */}
              <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
                <TextField variant='standard' label='Mobile Number' value={mobNo.phone} name={'mob_no'} sx={{ width: 300 }} />
                <TextField variant='standard' label='OTP' name={'otp'} onChange={(e) => setMobNo({ ...mobNo, otp: e.target.value })} sx={{ width: 300 }} />
                <Button variant='contained' sx={{ backgroundColor: '#fc94af', color: 'white' }} onClick={() => signUpUser()}>Continue</Button>
              </Stack>
            {/* </form> */}
          </Box>
        </div>

      </Modal>
    </>
  )
}

export default NewSignUp