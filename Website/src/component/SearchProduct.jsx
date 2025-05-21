import React from 'react'
import Header from '../pages/Header'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import axios from 'axios'

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
    

    <div style={{ textAlign: 'center', marginTop: '1%' }}>
        <Grid container spacing={12} >

          {uniqueData?.map((prod) => (

            <Grid item key={prod._id} >
              <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                <img src={axios.defaults.baseURL + prod.thumbnail} className='img-style' alt="" />
                <p className='title'>{prod.title}</p>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>

   </>
  )
}

export default SearchProduct