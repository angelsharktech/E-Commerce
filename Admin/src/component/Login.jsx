
import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import './login.css'
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
        <>
            {/* <div style={{ position: 'relative', height: '100vh', width: '100%' }}> */}
            <div className='background'>
                <Box
                    sx={{
                        width: '30%',
                        marginRight: '10%',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                        borderRadius: '12px'
                    }}>
                    <div >

                        <div className='login-style' >
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ color: '#dd25f5' }}>Login</h1>
                            </div>

                            <TextField variant='standard' label='Username' name={'username'} onChange={handleChange} sx={{ width: 300 }} />
                            <TextField variant='standard' label='Password' type='password' name={'password'} onChange={handleChange} sx={{ width: 300 }} />
                            <Button varient='contained' onClick={() => getAuthorize()} sx={{ backgroundColor: '#dd25f5', color: 'white' }}>LOGIN</Button>
                            {/* <Button sx={{color:'#093de6'}}>FORGOT PASSWORD</Button> */}
                        </div>
                        <div style={{ padding: '6%' }}>
                            <Link to={'/register'} style={{ color: '#dd25f5', marginLeft: '25%' }}>SIGN UP FOR NEW USER </Link>
                        </div>
                    </div>
                </Box>

            </div>

            {/* </div> */}
        </>

    )
}

export default Login