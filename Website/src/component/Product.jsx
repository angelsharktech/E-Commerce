import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './Home.css'
import axios from 'axios'
import Footer from '../pages/Footer'

const Product = () => {
    const { data } = useFetch('/product/getProduct')
    console.log('product data:', data);
    
    const [productsWithDiscount, setProductsWithDiscount] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const updatedProducts = data.map((prod) => {
        const actual = parseFloat(prod.actual_price);
        const selling = parseFloat(prod.selling_price);
        const discount = actual && selling ? Math.round(((actual - selling) / actual) * 100) : 0;
        return { ...prod, discount };
      });
      setProductsWithDiscount(updatedProducts);
    }
  }, [data]);
  return (
    <>
    <Header />
    

    <div  className='product-style'>
        <Grid container spacing={12} >
          {productsWithDiscount?.map((prod) => (

            <Grid item xs={12} sm={6} md={3} key={prod._id} className='box' >
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                <img src={axios.defaults.baseURL + prod.thumbnail} className='img-style' alt="" />
                <h5 >{prod.title}</h5>
                <p className='title' style={{marginLeft:'35%'}}>Price:<label style={{textDecoration: 'line-through'}}>{prod.actual_price} RS.</label>  {prod.selling_price} RS. ({prod.discount}% OFF )</p>
                <p className='title' ></p>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>

      <Footer/>
    </>
  )
}

export default Product