import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { userInformation } from '../context/AuthContext'
import axios from 'axios'
import useFetch from '../hooks/useFetch'

const Profile = () => {
  const { user } = useContext(userInformation)
  
  const [data, setData] = useState({
    username: '',
    mob_no: '',
    email: '',
    shop_name: '',
    shop_address: '',
    gst_no: '',
  })
  const [originalData, setOriginalData] = useState({})
  const record = useFetch(`/user/getUserById/${user._id}`)
  const userData = record.data


  useEffect(() => {
    // if (user) {
      setData({
        username: userData?.username,
        mob_no: userData?.mob_no,
        email: userData?.email,
        shop_name: userData?.shop_name,
        shop_address: userData?.shop_address,
        gst_no: userData?.gst_no,
      });

      setOriginalData({
        username: userData?.username,
        mob_no: userData?.mob_no,
        email: userData?.email,
        shop_name: userData?.shop_name,
        shop_address: userData?.shop_address,
        gst_no: userData?.gst_no,
      });
    // }
  }, [userData]);

  const isChange = JSON.stringify(data) !== JSON.stringify(originalData);

  const updateUser = async () => {
    try {
      const result = await axios.put(`/user/updateUser/${userData._id}`, data)

      if (result) {
        setData(result.data.data)
        record.refetch(`/user/getUserById/${user._id}`)
        alert(result.data.msg)
      }

    } catch (error) {

    }
  }

  return (
    <>
      <Box sx={{ width: "400px", height: '650px', color: ' #177bad', marginLeft: '50px' }} boxShadow={3} borderRadius={5} >
        <Stack direction='column' spacing={4} style={{ padding: '20px' }}>
          <TextField variant='standard' label='Username' value={data?.username} name={'username'} onChange={(e) => setData({ ...data, username: e.target.value })} />
          {/* <TextField variant='standard' label='Password' type='password' name={'password'} onChange={(e) => setData({ ...data, password: e.target.value })} /> */}
          <TextField variant='standard' label='Email' type='email' value={data?.email} name={'email'} onChange={(e) => setData({ ...data, email: e.target.value })} />
          <TextField variant='standard' label='Mobile Number' value={data?.mob_no} name={'mob_no'} onChange={(e) => setData({ ...data, mob_no: e.target.value })} />
          <TextField variant='standard' label='Shop Name' value={data?.shop_name} name={'shop_name'} onChange={(e) => setData({ ...data, shop_name: e.target.value })} />
          <TextField variant='standard' label='Shop Address' value={data?.shop_address} name={'shop_address'} onChange={(e) => setData({ ...data, shop_address: e.target.value })} />
          <TextField variant='standard' label='GST Number' value={data?.gst_no} name={'gst_no'} onChange={(e) => setData({ ...data, gst_no: e.target.value })} />
          <Button varient='contained' sx={{ backgroundColor: '#c26afc', color: 'white' }} onClick={() => { updateUser() }} disabled={!isChange}> Update </Button>
        </Stack>
      </Box>


    </>
  )
}

export default Profile