import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './Home.css'
import axios from 'axios'
import Footer from '../pages/Footer'
import NewFooter from '../pages/NewFooter'

const Product = () => {
    const { data } = useFetch('/product/getProduct')
   

  return (
    <>
    <Header />
    

    <div  className='product-style'>
        <Grid container spacing={3} sx={{ marginTop: '2%' }} >
                  {data?.map((prod) => (
                    <Grid item xs={12} sm={6} md={3} key={prod._id} className='box'>
                      <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                        <img src={axios.defaults.baseURL + prod.thumbnail} className='img-style' alt={prod.title} />
                        <p className='title'>{prod.title}</p>
                        <p>
                          <span className="price-label">{prod.actual_price} RS.</span>
                          <span className='selling_label'>{prod.selling_price} RS.</span>
                          {prod.discount > 0 && (
                            <span className="discount-badge">{prod.discount}% OFF</span>
                          )}
                        </p>
                      </Link>
                    </Grid>
                  ))}
                </Grid>
      </div>

      <NewFooter/>
    </>
  )
}

export default Product