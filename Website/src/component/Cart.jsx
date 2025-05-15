import React, { useContext, useEffect } from 'react'
import Header from '../pages/Header'
import { useLocation, useParams } from 'react-router-dom'
import { userInformation } from '../context/AuthContext'
import axios from 'axios'

const Cart = () => {
    const { webuser} = useContext(userInformation)
    const { data } = useParams()
    const location = useLocation();
    const product = location.state?.prod;

console.log('Product in cart:', product);

   
    
  return (
    <>
    <Header />
    <div>Cart</div>
    </>
  )
}

export default Cart