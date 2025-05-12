import React from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

const Product = () => {
    const { data } = useFetch('/product/getProduct')
  return (
    <>
    <Header />
    

    <div style={{ textAlign: 'center', marginTop: '1%' }}>
        <Grid container spacing={12} >
          {data?.map((prod) => (

            <Grid item key={prod._id} >
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                <img src={`http://localhost:3000/api${prod.thumbnail}`} className='img-style' alt="" />
                <p className='title'>{prod.title}</p>
                {/* <p className='title'>Rating:{data.vote_average}</p> */}
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

export default Product