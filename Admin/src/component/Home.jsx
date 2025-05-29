import React, { useContext } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import './Home.css'
import { userInformation } from '../context/AuthContext'

const Home = () => {
    const { user } = useContext(userInformation)
    console.log('Home:', user);

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
                    <p style={{ color: 'whitesmoke' }}>
                        <h3>Total Products</h3>
                        <h1>50</h1>
                    </p>
                </Paper>
                <Paper elevation={12} className='paper-style' style={{
                    background: 'linear-gradient(135deg,rgb(72, 237, 243),rgb(39, 121, 243))'
                }}
                >
                    <p style={{ color: 'whitesmoke' }}>
                        <h3>Total Categories</h3>
                        <h1>50</h1>
                    </p>
                </Paper>
                <Paper elevation={12} className='paper-style' style={{
                    background: 'linear-gradient(135deg,rgb(140, 241, 228),rgb(56, 240, 133))'
                }}
                >
                    <p style={{ color: 'whitesmoke' }}>
                        <h3>Orders</h3>
                        <h1>50</h1>
                    </p>
                </Paper>
            </div>
        </>
    )
}

export default Home