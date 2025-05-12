import { AppBar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className='container'>
    <AppBar style={{ height: '60px',backgroundColor:'#c26afc' }}>

      <h3 style={{ marginTop: '12px', marginLeft: "50px" }}>Admin Panel</h3>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'right',
        marginRight: '10%', marginTop: '-4%',
        gap: '20px', alignItems: 'center'
      }}>
        <Link to={'/product'} style={{textDecoration:'none',color:'white'}} >Upload Product</Link>
        <Link to={'/product'} style={{textDecoration:'none',color:'white'}} >Add Categories</Link>
        <Link  style={{textDecoration:'none',color:'white'}} >About Us</Link>
        <Link  style={{textDecoration:'none',color:'white'}} >Contact Us</Link>
        <Link to={'/'} style={{textDecoration:'none',color:'white'}}>SignOut</Link>
       
      </div>

    </AppBar>
  </div>
  </>
  )
}

export default Header