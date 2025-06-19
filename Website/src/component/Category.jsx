import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import './Home.css'
import axios from 'axios'
import Footer from '../pages/Footer'
import NewFooter from '../pages/NewFooter'

const Category = () => {
  const { name } = useParams()
  
  const product = useFetch(`/product/getProductByCategory/${name}`)
  const [productsWithDiscount, setProductsWithDiscount] = useState([]);
  
    useEffect(() => {
      if (product.data && Array.isArray(product.data)) {
        
        const updatedProducts = product.data.map((prod) => {
          
          const actual = parseFloat(prod.actual_price);
          const selling = parseFloat(prod.selling_price);
          const discount = actual && selling ? Math.round(((actual - selling) / actual) * 100) : 0;
          return { ...prod, discount };
        });
        setProductsWithDiscount(updatedProducts);
      }
    }, [product.data]);

  return (
    <>
      <Header />
       <div  className='product-style'>
      {productsWithDiscount && productsWithDiscount.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: '1%', marginLeft: '3%' }}>
          <Grid container spacing={12} >
            {productsWithDiscount.map((prod) => 
            (

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
          <img src="/no-data.jpg" alt="Loading..." style={{ marginTop: '5%', width: '50%' }} />
        </div>
      )}
      </div>
      <NewFooter />
    </>
  )
}

export default Category