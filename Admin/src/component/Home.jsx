import React, { useContext } from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import './Home.css'
import { userInformation } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'

const Home = () => {
    const { user } = useContext(userInformation)
    const total_product = useFetch(`/product/getProductByShop/${user.shop_name}`)
    const total_category = useFetch(`/category/getCategoryByShop/${user.shop_name}`)
    console.log('total_product',total_product);
    

  return (
  <Box
  className='home-background'
  >
    <Grid container spacing={4} justifyContent="center"  alignItems="stretch"
    maxWidth="md" >
      <Grid item xs={12} sm={6} md={4}>
        <Paper
        className='home-paper'
          elevation={8}         
          sx={{
              color: '#c26afc',
            // background: 'linear-gradient(135deg,rgb(250, 171, 162), #fe5196)',
            }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{marginTop:'30px'}}>
            Total Products
          </Typography>
          <Typography variant="h2" fontWeight={700}>
            {total_product.data?.count ? total_product.data?.count : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={8}
          className='home-paper'
          sx={{
             color: '#c26afc',
            // background: 'linear-gradient(135deg,rgb(172, 244, 247), #2779f3)',
          }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{marginTop:'30px'}}>
            Total Categories
          </Typography>
          <Typography variant="h2" fontWeight={700}>
            {total_category.data?.count ? total_category.data?.count : 0}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper
          elevation={8}
            className='home-paper'
          sx={{
            // background: 'linear-gradient(90deg,rgb(126, 142, 233) 0%,rgb(172, 72, 238) 100%)',
            // background: 'linear-gradient(135deg,rgb(128, 228, 133) 0%,rgb(212, 240, 55) 100%)',
            color: '#c26afc',
       }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom sx={{marginTop:'30px'}}>
            Orders
          </Typography>
          <Typography variant="h2" fontWeight={700}>
            0
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
)
}

export default Home