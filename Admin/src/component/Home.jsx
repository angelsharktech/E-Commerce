import React, { useContext } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import './Home.css'
import { userInformation } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'

const Home = () => {
    const { user } = useContext(userInformation)
    const total_product = useFetch(`/product/getProductByShop/${user.shop_name}`)
    const total_category = useFetch(`/category/getCategoryByShop/${user.shop_name}`)
    console.log('total_product',total_product);
    

    return (
        <>
            <div style={{ marginTop: '3%', display: 'flex', flexDirection: 'row', gap: '12%' }}>

                <Paper elevation={12} className='paper-style'
                    style={{ background: 'linear-gradient(135deg, #f77062, #fe5196)' }}
                >
                    {/* <Box sx={{
                        position: 'absolute',
                        top: 110,
                        width: 60,
                        height: 60,
                        borderRadius: 2,
                        background: 'linear-gradient(145deg,rgb(202, 195, 195),rgb(39, 38, 38))', // dark box
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 3,
                        color: 'white',
                    }}>
                        manasi
                        <MailIcon fontSize="small" />
                    </Box> */}
                    {/* <p style={{ color: 'whitesmoke' }}> */}
                        <h2 style={{color:'whitesmoke'}}>Total Products</h2>
                        <h1 style={{color:'whitesmoke'}} >{total_product.data?.count}</h1>
                    {/* </p> */}
                </Paper>
                <Paper elevation={12} className='paper-style' style={{
                    background: 'linear-gradient(135deg,rgb(72, 237, 243),rgb(39, 121, 243))'
                }}
                >
                    
                        <h2 style={{ color: 'whitesmoke' }}>Total Categories</h2>
                        <h1 style={{ color: 'whitesmoke' }}>{total_category.data?.count}</h1>
                   
                </Paper>
                <Paper elevation={12} className='paper-style' style={{
                    background: 'linear-gradient(135deg,rgb(140, 241, 228),rgb(56, 240, 133))'
                }}
                >
                        <h2 style={{ color: 'whitesmoke' }}>Orders</h2>
                        <h1 style={{ color: 'whitesmoke' }}>0</h1>
                    
                </Paper>
            </div>
        </>
    )
}

export default Home