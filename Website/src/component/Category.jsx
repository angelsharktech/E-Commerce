import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import './Home.css'
import axios from 'axios'

const Category = () => {
  const { name } = useParams()
  console.log('catName:',name);
  
  const product = useFetch(`/product/getProductByCategory/${name}`)
  const [productsWithDiscount, setProductsWithDiscount] = useState([]);
  console.log('product:', product);

    useEffect(() => {
      if (product.data && Array.isArray(product.data)) {
        console.log('*****');
        
        const updatedProducts = product.data.map((prod) => {
          
          
          const actual = parseFloat(prod.actual_price);
          const selling = parseFloat(prod.selling_price);
          const discount = actual && selling ? Math.round(((actual - selling) / actual) * 100) : 0;
          return { ...prod, discount };
        });
        setProductsWithDiscount(updatedProducts);
      }
    }, [product.data]);
console.log('updatedProducts:',productsWithDiscount);

  return (
    <>
      <Header />
      {productsWithDiscount && productsWithDiscount.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: '1%', marginLeft: '3%' }}>
          <Grid container spacing={12} >
            {productsWithDiscount.map((prod) => 
            (

              <Grid item xs={12} sm={6} md={3} key={prod._id} className='box' >
                <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                  <img src={ axios.defaults.baseURL + prod.thumbnail } className='img-style' alt="" />
                  <p className='title'>{prod.title}</p>
                  <p className='title'>Price:<label style={{textDecoration: 'line-through'}}>{prod.actual_price} RS.</label>  {prod.selling_price} RS. ({prod.discount}% OFF )</p>
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
          <img src="/no_data.gif" alt="Loading..." style={{ marginTop: '21%', width: '50%' }} />
        </div>
      )}

    </>
  )
}

export default Category