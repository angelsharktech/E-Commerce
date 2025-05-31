import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { userInformation } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {
    const { user } = useContext(userInformation)
    const [data, setData] = useState({})
    const [originalData, setOriginalData] = useState({})
    // console.log('userProfile:',user);
    
    useEffect(() => {
        if (user) {
            setData(user);
            setOriginalData(user);
        }
    }, [user]);

    const isChange = JSON.stringify(data) !== JSON.stringify(originalData);

const updateUser = async() => {
    try {
      const result = await axios.put(`/user/updateUser/${data._id}`, data)
      
      if (result) {
        console.log(result);
        alert(result.data.msg)
      }

    } catch (error) {

    }
  }

    return (
        <>
            <Box sx={{ width: "400px", height: '650px', color: ' #177bad', marginLeft: '50px' }} boxShadow={3} borderRadius={5} >
                <Stack direction='column' spacing={4} style={{ padding: '20px' }}>
                    <TextField variant='standard' label='Username' value={data.username} name={'username'} onChange={(e) => setData({ ...data, username: e.target.value })} />
                    {/* <TextField variant='standard' label='Password' type='password' name={'password'} onChange={(e) => setData({ ...data, password: e.target.value })} /> */}
                    <TextField variant='standard' label='Email' type='email' value={data.email} name={'email'} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <TextField variant='standard' label='Mobile Number' value={data.mob_no} name={'mob_no'} onChange={(e) => setData({ ...data, mob_no: e.target.value })} />
                    <TextField variant='standard' label='Shop Name' value={data.shop_name} name={'shop_name'} onChange={(e) => setData({ ...data, shop_name: e.target.value })} />
                    <TextField variant='standard' label='Shop Address' value={data.shop_address} name={'shop_address'} onChange={(e) => setData({ ...data, shop_address: e.target.value })} />
                    <TextField variant='standard' label='GST Number' value={data.gst_no} name={'gst_no'} onChange={(e) => setData({ ...data, gst_no: e.target.value })} />
                    <Button varient='contained' sx={{ backgroundColor: '#c26afc', color: 'white' }} onClick={() => { updateUser() }} disabled={!isChange}> Update </Button>
                </Stack>
            </Box>


        </>
    )
}

export default Profile