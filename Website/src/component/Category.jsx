import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import './Home.css'
// import './Category.css'
import axios from 'axios'
import NewFooter from '../pages/NewFooter'

const Category = () => {
  const { name } = useParams()
  // const category = useFetch(`/category/getCategoryByMainCategory/${name}`);
  const product = useFetch(`/product/getProductByCategory/${name}`)
  // console.log('main Category::',product);
  
  return (
    <>
      <Header />
    {/* Subcategory bar */}
    
{/* <div className="category-bar">
  {category.data?.result?.map((cat) =>
    cat.subCategories?.map((sub, idx) => (
      <Link
        key={cat._id + '-' + idx}
        to={`/subcategory/${cat.mainCategory}/${sub}`}
        className="category-item"
      >
        {sub}
  
      </Link>
    ))
  )}
</div> */}

       <div  className='product-style'>
      {product.data?.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: '1%', marginLeft: '3%' }}>
          <Grid container spacing={12} >
             {product.data?.map((prod) => (
                    <Grid item xs={12} sm={6} md={3} key={prod._id} className='box'>
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
          </Grid>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh', // adjust height as needed
            textAlign: 'center',
            flexDirection: 'column'
          }}
        >

          <img src="/not_found.gif" alt="Loading..." style={{ width: '60%',height:'100%' }} />
          <h3 style={{color:'#471396'}}>NO DATA FOUND</h3>
       
        </div>
      )}
      </div>
      <NewFooter />
    </>
  )
}

export default Category