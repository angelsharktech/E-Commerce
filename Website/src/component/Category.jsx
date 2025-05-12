import React from 'react'
import Header from '../pages/Header'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

const Category = () => {
    const {name} = useParams()
    const product  = useFetch(`/product/getProductByCategory/${name}`)
    console.log('product:',product);
    
  return (
    <>
    <Header />
    { product.data && product.data.length > 0 ? (
<div style={{ textAlign: 'center', marginTop: '1%' }}>
           <Grid container spacing={12} >
             {product.data?.map((prod) => (
   
               <Grid item key={prod._id} >
                 <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                   <img src={`http://localhost:3000/api${prod.thumbnail}`} className='img-style' alt="" />
                   <p className='title'>{prod.title}</p>
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
 <img src="/no_data.gif" alt="Loading..." style={{marginTop:'21%', width: '50%' }} />
</div>
    )}
    
    </>
  )
}

export default Category