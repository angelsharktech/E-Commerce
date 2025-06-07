import React from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import axios from 'axios'
import Footer from '../pages/Footer'
import './Home.css'

const SearchProduct = () => {
  const { name } = useParams()
  const product = useFetch(`/product/getProductByName/${name}`)
  const category = useFetch(`/product/getProductByCategory/${name}`)
  const mergedData = [...(product.data || []), ...(category.data || [])];


  // Remove duplicates by _id
  const uniqueData = Array.from(
    new Map(mergedData.map(item => [item._id, item])).values()
  );
  console.log(uniqueData);

  return (
    <>
      <Header />


        <div  className='product-style'>
            <Grid container spacing={3} sx={{ marginTop: '2%' }} >

          {uniqueData.length > 0 ? uniqueData?.map((prod) => (

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
          )) :
          <div
            style={{
              textAlign: 'center',
              // marginTop: '20px',
              width: '100%',
              fontSize: '1.5rem',
              color: '#f44336'
            }}>
            <img src="/no-data.jpg" alt="Loading..." style={{  width: '50%' }} />
          </div>
          }
        </Grid>
      </div>

      <Footer />
    </>
  )
}

export default SearchProduct