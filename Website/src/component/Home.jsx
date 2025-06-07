import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import './Home.css'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../pages/Footer'

const Home = () => {
  const { data } = useFetch('/product/getProduct')
  const category  = useFetch('/category/getCategory')
  console.log('category data:',category);
 const displayedProducts = data?.slice(0, 5)
  return (
    <>
      <Header />
      <div className='carousel-container' >
        <div id="carouselExampleInterval" className="carousel slide" data-ride="carousel" data-interval="35000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="/toy13.jpg" alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="toy2.jpg" alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/toy11.jpg" alt="Third slide" />
            </div>
          </div>
          <a className=" carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" style={{ alignItems: 'center' }}> </span>
            <span className="sr-only">Previous</span>
          </a>
          <a className=" carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
            <span className="carousel-control-next-icon">

            </span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div style={{ marginLeft: '2% ', textAlign: 'center', marginTop: '2%' }}>
        <h1>Products</h1>

        <Grid container spacing={3} sx={{ marginTop: '2%' }} >
          {displayedProducts?.map((prod) => (
            <Grid item xs={6} sm={6} md={3} key={prod._id} className='box'>
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                <img src={axios.defaults.baseURL + prod.thumbnail} className='img-style' alt={prod.title} />
                <p className='title'>{prod.title}</p>
                <p>
                  <span className="price-label">{prod.actual_price} RS.</span>
                  <span style={{ color: '#43a047', fontWeight: 'bold', fontSize: '1.1rem' }}>{prod.selling_price} RS.</span>
                  {prod.discount > 0 && (
                    <span className="discount-badge">{prod.discount}% OFF</span>
                  )}
                </p>
              </Link>
            </Grid>
          ))}
           <Grid item xs={6} sm={6} md={3}style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to={'/product'} className='discount-badge' style={{textDecoration: 'none', '&:hover': { transform: 'scale(1.1)' }}}>View More</Link>

           </Grid>
        </Grid>
      </div>

        <div style={{ marginLeft: '2% ', textAlign: 'center', marginTop: '2%' }}>
        <h1>category</h1>
        <Grid container spacing={3} sx={{ marginTop: '2%' }} >
          {category.data?.map((cat) => (
            <Grid item xs={6} sm={6} md={3} key={cat._id} className='category-box'>
              <Link style={{ textDecoration: 'none' }} to={`/category/${cat.categoryName}`}>
                <p className='cat-title'>{cat.categoryName}</p>
              </Link>
            </Grid>
          ))}
           {/* <Grid item xs={6} sm={6} md={3}style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Link to={'/product'}>View More</Link>

           </Grid> */}
        </Grid>
        </div>
      <Footer />

    </>
  )
}

export default Home