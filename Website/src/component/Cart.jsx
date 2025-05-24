import React, { useContext, useEffect, useState } from 'react'
import Header from '../pages/Header'
import { userInformation } from '../context/AuthContext'
import useFetch from '../hooks/useFetch'
import { Box, Button } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { useCart } from '../context/CartContext'
import axios from 'axios'

const Cart = () => {
  const { webuser } = useContext(userInformation)
  console.log('web::',webuser);
  const data = useFetch(`/cart/getCartItem/${webuser._id}`)
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
 
  useEffect(() => {
  if (data?.data?.cart) {
    setCartItems(data.data.cart);
    console.log('***',data.data.cart);

   
  let tempTotal = 0;
    data.data.cart.map((item) => {
      tempTotal += item.price ;
      
      return null;
    });

    setTotal(tempTotal);
    
  }
}, [data]);


  const increaseCount = async(cartId) =>{
    // setCartCount
     const updatedCart = cartItems.map(item =>
    item._id === cartId ? { ...item, quantity: item.quantity + 1 } : item
  );
  
  setCartItems(updatedCart);
  console.log('updatedCart::',updatedCart);
  
  try {
     const updatedItem = updatedCart.find(item => item._id === cartId);
    const result =await axios.put(`/cart/UpdateCart/${webuser._id}`, 
      {
      _id: updatedItem._id,
      quantity: updatedItem.quantity,
      price : updatedItem.price
    });
    data.refetch(`/cart/getCartItem/${webuser._id}`)
    // console.log('updatedCart::',updatedCart);
  } catch (error) {
    console.log(error);
  }
  }

   const decreaseCount = async(cartId) =>{
    // setCartCount
     const updatedCart = cartItems.map(item =>
    item._id === cartId ? { ...item, quantity: item.quantity - 1 } : item
  );
  
  setCartItems(updatedCart);
  console.log('updatedCart::',updatedCart);
  
  try {
     const updatedItem = updatedCart.find(item => item._id === cartId);
    const result =await axios.put(`/cart/UpdateCart/${webuser._id}`, 
      {
      _id: updatedItem._id,
      quantity: updatedItem.quantity,
      price : updatedItem.price
    });
    data.refetch(`/cart/getCartItem/${webuser._id}`)
    // console.log('updatedCart::',updatedCart);
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <>
      <Header />
      {/* <div>Cart</div> */}
      <div  style={{display:'flex',flexDirection:'column', alignItems: 'center',justifyContent:'center'}} >

          {!data.data ? <><h3>Cart is empty</h3></> : <>
        <table 
          style={{ marginTop: '2%',width:'50%'}} className="table table-bordered table_bg_white">
            <thead>
              <tr>
                <th></th>
                <th>
                  Product name
                </th>
                <th>
                  Price
                </th>
              </tr>
            </thead>

            <tbody>
              {!data ? <><h1>L O A D I N G</h1></> : <>
                {cartItems.map((cart, index) => (
                  <>
                  <tr>
                    {/* {cart._id} */}
                  <th></th>
                    <th>{cart.title}<br /><br />
                    <Box sx={{border:'1px solid grey', width:'fit-content' ,borderRadius:'10px'}}>

                    <Button onClick={()=>increaseCount(cart._id)} size='small' ><AddCircleOutlineIcon/></Button>
                    <label>{cart.quantity}</label>
                    <Button onClick={()=>decreaseCount(cart._id)} size='small'> <RemoveCircleOutlineRoundedIcon/> </Button>
                    </Box>
                    </th>
                    <th>{cart.price}</th>
                  </tr>
                  </>
                ))}
              </>}
              <tr>
                <th></th>
                <th style={{float:'right'}}>Total:</th>
                <th>RS. {total}  </th>
              </tr>
            </tbody>
        </table>
        <div style={{ width: '50%' }} >

          <Button variant='contained' style={{float:'right',backgroundColor:'#c26afc',borderRadius:'50px'}}>Proceed To Pay</Button>
        </div>
          </>}
         
      </div>
    </>
  )
}

export default Cart