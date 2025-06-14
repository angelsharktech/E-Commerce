import React, { useContext, useEffect, useState } from 'react'
import Header from '../pages/Header'
import { Stack, Button, TextField, Modal, Box } from '@mui/material'
import { Close } from '@mui/icons-material'
import { userInformation } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import axios from 'axios';
import './Buynow.css'
import Footer from '../pages/Footer'


const Buynow = () => {
  const { pid } = useParams()
  const { webuser, dispatch } = useContext(userInformation)
  const product = useFetch(`/product/getProductById/${pid}`)
  const [productWithQty, setProductWithQty] = useState(0);
  

  useEffect(() => {
    if (product.data) {
      setProductWithQty({ ...product.data, quantity: 1, price: product.data.selling_price });

    }
  }, [product.data]);

  const increaseCount = async (prodId) => {
    try {
    
      if (productWithQty._id === prodId) {
        const newQty = productWithQty.quantity + 1
        const updatedProduct = {
          ...productWithQty,
          quantity: newQty,
          price: newQty * productWithQty.selling_price
        };

        setProductWithQty(updatedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const decreaseCount = async (prodId) => {
    try {
    
      if (productWithQty._id === prodId) {
        const newQty = productWithQty.quantity - 1
        const updatedProduct = {
          ...productWithQty,
          quantity: newQty,
          price: newQty * productWithQty.selling_price
        };

        setProductWithQty(updatedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <Header />
      
      <h4 className='title'>Shipping Address:</h4>

      <Stack direction={{ base: 'column', md: 'row' }} spacing={2} className='stack-style'>
        <Stack item direction={'column'} spacing={2} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>

          <TextField label='User Name' name={'name'} value={webuser.name} sx={{ width: 300 }} size='small' />
          <TextField label='Email Address' name={'email'} value={webuser.email} sx={{ width: 300 }} size='small' />
          <TextField label='Mobile Number' name={'mob_no'} value={webuser.mob_no} sx={{ width: 300 }} size='small' />
          <TextField label='Address' name={'address'} value={webuser.address} sx={{ width: 300 }} size='small' />
          <TextField label='Pin Code' name={'pincode'} value={webuser.pincode} sx={{ width: 300 }} size='small' />
          {/* <Button variant='contained' sx={{ backgroundColor: '#c26afc', color: 'white' }} type='submit'>Register</Button> */}
        </Stack>
        <Stack item direction={'column'} spacing={4} style={{ justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>


          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} >

            <table
              style={{ marginTop: '2%' }} className="table table-bordered table_bg_white">
              <thead>
                <tr>
                  <th></th>
                  <th >
                    Product name
                  </th>
                  <th>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  {/* {cart._id} */}
                  <th><img src={axios.defaults.baseURL + productWithQty?.thumbnail} style={{ height: '2%', width: '50%' }} /></th>

                  <th>{productWithQty?.title}<br /><br />
                    <Box sx={{ border: '1px solid grey', width: 'fit-content', borderRadius: '10px' }}>

                      <Button onClick={() => increaseCount(productWithQty._id)} size='small' ><AddCircleOutlineIcon /></Button>
                      <label>{productWithQty?.quantity}</label>
                      <Button onClick={() => decreaseCount(productWithQty._id)} size='small'> <RemoveCircleOutlineRoundedIcon /> </Button>
                    </Box>
                  </th>
                  <th>{productWithQty?.price}</th>
                </tr>

                {/* <tr>
                <th></th>
                <th style={{float:'right'}}>Total:</th>
                <th>RS. {total}  </th>
                </tr> */}
              </tbody>
            </table>
            <div style={{ width: '50%' }} >

              <Button variant='contained' style={{ float: 'right', backgroundColor: '#fc94af', borderRadius: '50px' }}>Proceed To Pay</Button>
            </div>


          </div>
        </Stack>
      </Stack>
     <Footer />
    </>
  )
}


export default Buynow