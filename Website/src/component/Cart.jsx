import React, { useContext } from 'react'
import Header from '../pages/Header'
import { useParams } from 'react-router-dom'
import { userInformation } from '../context/AuthContext'

const Cart = () => {
    const {user} = useContext(userInformation)
    const {id } = useParams()

    console.log('cart::',id , user);
    
  return (
    <>
    <Header />
    <div>Cart</div>
    </>
  )
}

export default Cart