import React from 'react'
import Header from '../pages/Header'
import './Home.css'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  const { data } = useFetch('/product/getProduct')
  console.log(data);
  
  return (
    <>
      <Header />
      <div className='carousel-container' >
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
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
          <a className=" carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" style={{ alignItems: 'center' }}> </span>
            <span className="sr-only">Previous</span>
          </a>
          <a className=" carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon">

            </span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1%' }}>
        <h1>Products</h1>


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

export default Home