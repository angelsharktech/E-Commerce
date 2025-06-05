import React, { useContext } from 'react'
import Header from '../pages/Header'
import { Button, Stack, TextField } from '@mui/material'
import './signup.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { userInformation } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const { dispatch } = useContext(userInformation)
      const navigate = useNavigate()
    const { register, handleSubmit } = useForm()

    const registerUser = async (data) => {
    try {
      console.log('registerUser::', data);

      const result = await axios.post('/webuser/register', data)
      if (result.data.msg === 'User Created Successfully') {
       const cred = {
        email: data.email,
        password: data.password,
      }
      const res = await axios.post('/webuser/login', cred)
      console.log('res::',res);
      if (res.data.msg ==='Login Successfully') {
         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })
        res.data.details ? navigate('/home') : alert(res.data.msg)
      }else{
        alert(res.data.msg)
      }
      }else{
        alert(result.data.msg)
      }

    } catch (error) {
      console.log(error);

    }
  }

    return (
        <>
            <Header />
            <div className='signup-container'>
                <div className='box-style'>
                    <form onSubmit={handleSubmit(registerUser)}>
                    <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>

                        <TextField variant='standard' label='User Name' name={'name'} {...register('name')} sx={{ width: 300 }} />
                        <TextField variant='standard' label='Email Address' name={'email'} {...register('email')} sx={{ width: 300 }} />
                        <TextField variant='standard' label='Mobile Number' name={'mob_no'} {...register('mob_no')} sx={{ width: 300 }} />
                        <TextField variant='standard' label='Address' name={'address'} {...register('address')} sx={{ width: 300 }} />
                        <TextField variant='standard' label='Pin Code' name={'pincode'} {...register('pincode')} sx={{ width: 300 }} />
                        <TextField variant='standard' label='Password' type='password' name={'password'} {...register('password')} sx={{ width: 300 }} />
                        <Button variant='contained' sx={{ backgroundColor: '#c26afc', color: 'white' }} type='submit'>Register</Button>
                    </Stack>

                </form>
            </div>
        </div >
        </>
    )
}

export default Signup