import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './Home.css'

const Product = () => {
    const { data } = useFetch('/product/getProduct')
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
    

    <div style={{ textAlign: 'center', marginTop: '2%' }}>
        <Grid container spacing={12} >
          {productsWithDiscount?.map((prod) => (

            <Grid item key={prod._id} >
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                <img src={`http://localhost:3000/api${prod.thumbnail}`} className='img-style' alt="" />
                <h5 >{prod.title}</h5>
                <p className='title' style={{marginLeft:'35%'}}>Price:<text style={{textDecoration: 'line-through'}}>{prod.actual_price} RS.</text>  {prod.selling_price} RS. ({prod.discount}% OFF )</p>
                <p className='title' ></p>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

export default Product