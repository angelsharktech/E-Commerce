import React, { useContext, useEffect, useState } from 'react'
import Header from '../pages/Header'
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material'
import { userInformation } from '../context/AuthContext'
import axios from 'axios'
import useFetch from '../hooks/useFetch'

const Profile = () => {
  const { webuser , dispatch } = useContext(userInformation)
  const refreshed = useFetch(`/webuser/getWebUserById/${webuser?._id}`);
  
  const [user, setUser] = useState({
    name: '' ,
    mob_no: '' ,
    address: '' ,
    email: '' ,
    lane: '' ,
    city: '' ,
    state: '' ,
    pincode: '' ,
  })

  
  useEffect(() => {
  if (webuser) {
    setUser({
      name: refreshed.data?.name || '',
      mob_no: refreshed.data?.mob_no || '',
      address: refreshed.data?.address || '',
      email: refreshed.data?.email || '',
      lane: refreshed.data?.lane || '',
      city: refreshed.data?.city || '',
      state: refreshed.data?.state || '',
      pincode: refreshed.data?.pincode || '',
    });
  }
}, [refreshed.data]);

  const updateWebUser = async () => {
    try {
       setUser(user)
   
    const result = await axios.put(`/webuser/updateWebUser`, user)
    
    if (result.data.msg === 'User Updated Successfully') {
      alert(result.data.msg)
    
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { webuser: result.data.details } });
      localStorage.setItem('webuser', JSON.stringify(result.data.details));

    } else {
      console.log('else res::',result.data);
      // alert(result.data.msg)
    }
    } catch (error) {
      console.log(error);
      alert('Error updating user');
    }
   
  }

  return (
    <>
      <Header />
      <Box sx={{ marginLeft: { xs: 0, sm: 4, lg: 14 }, marginTop: { xs: 2, sm: 0, lg: 5 }, alignContent: 'center' }}>
        <Card sx={{ width: '80%', borderRadius: 5, boxShadow: 6, alignContent: 'center' }}>
          <CardContent>
            <Typography variant="h5" fontWeight={600} color="#177bad" sx={{ textAlign: 'center', marginTop: 2 }}>
              {/* Profile */}
            </Typography>
            <Stack direction='column' spacing={3}>
              <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                <TextField
                  variant='outlined'
                  label='Enter Name'
                  value={user?.name || ''}
                  name='name'
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  fullWidth
                />
                <TextField
                  variant='outlined'
                  label='Contact Number'
                  value={user.mob_no}
                  name='mob_no'
                  onChange={(e) => setUser({ ...user, mob_no: e.target.value })}
                  sx={{ width: 500 }}
                />
              </Stack>
              <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                <TextField
                  variant='outlined'
                  label='Enter Address'
                  value={user?.address || ''}
                  name='address'
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  fullWidth
                  multiline
                  // minRows={3}
                />
                <TextField
                  variant='outlined'
                  label='Enter EmailId'
                  value={user?.email || ''}
                  name='email'
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                   sx={{ width: 500 }}
                 
                />
              </Stack>
              <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                <TextField
                  variant='outlined'
                  label='Enter Lane'
                  value={user?.lane || ''}
                  name='lane'
                  onChange={(e) => setUser({ ...user, lane: e.target.value })}
                  fullWidth
                />
                <TextField
                  variant='outlined'
                  label='Enter City'
                  value={user?.city || ''}
                  name='city'
                  onChange={(e) => setUser({ ...user, city: e.target.value })}
                  fullWidth
                />
                <TextField
                  variant='outlined'
                  label='Enter State'
                  value={user?.state || ''}
                  name='state'
                  onChange={(e) => setUser({ ...user, state: e.target.value })}
                  fullWidth
                />
              </Stack>
              <Stack direction='row' spacing={2} sx={{ marginTop: 2 }}>
                <TextField
                  variant='outlined'
                  label='Enter Pincode'
                  value={user?.pincode || ''}
                  name='pincode'
                  onChange={(e) => setUser({ ...user, pincode: e.target.value })}
                  sx={{ width: 300 }}
                />
                <Button variant='contained' className='product-btn' onClick={() => {updateWebUser()}}>Update</Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default Profile

// name: String,
//   mob_no: Number,
//   email: String,
//   address: String,
//   lane: String,
//   city: String,
//   state: String,
//   pincode: String,