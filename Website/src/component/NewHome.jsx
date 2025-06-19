import React from 'react'
import Header from '../pages/Header'
import './NewHome.css'
import useFetch from '../hooks/useFetch'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../pages/Footer'
import NewFooter from '../pages/NewFooter'
const NewHome = () => {
   const { data } = useFetch('/product/getProduct')
  const category = useFetch('/maincategory/getCategory')
  const displayedProducts = data?.slice(0, 8)
  console.log(category.data);
  

  return (
    <>
      <Header />

      {/* Category Bar */}
      <div className="category-bar">
        {category.data?.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.main_category}`}
            className="category-item"
          >
            <img
               src={axios.defaults.baseURL + cat.image}
              alt={cat.image}
              className="category-icon"
            />
            <span>{cat.main_category}</span>
          </Link>
        ))}
        
      </div>

      {/* Banner/Carousel */}
      {/* <div className="banner">
        <img src="/banner1.jpg" alt="Banner" className="banner-img" />
      </div> */}

      {/* Deals/Offers Section */}
      {/* <div className="deals-section">
        <img src="/deal1.jpg" alt="Deal" className="deal-img" />
        <img src="/deal2.jpg" alt="Deal" className="deal-img" />
        <img src="/deal3.jpg" alt="Deal" className="deal-img" />
      </div> */}

      {/* Product Slider */}
      <div className="product-slider">
        <div className="slider-header">
          <h2>Top Deals</h2>
          <Link to="/product" className="view-all">View All</Link>
        </div>
        <div className="slider-row">
          {displayedProducts?.map((prod) => (
            <div className="product-card" key={prod._id}>
              <Link to={`/prodDetail/${prod._id}`}>
                <img
                  src={axios.defaults.baseURL + prod.thumbnail}
                  alt={prod.title}
                  className="product-img"
                />
                <div className="product-title">{prod.title}</div>
                <div className="product-pricing">
                  <span className="price">₹{prod.selling_price}</span>
                  {prod.discount > 0 && (
                    <span >{prod.discount}% OFF</span>
                  )}
                  <span className="mrp">₹{prod.actual_price}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="product-slider">
        <div className="slider-header">
          <h2>Top Deals</h2>
          <Link to="/product" className="view-all">View All</Link>
        </div>
        <div className="slider-row">
          {displayedProducts?.map((prod) => (
            <div className="product-card" key={prod._id}>
              <Link to={`/prodDetail/${prod._id}`}>
                <img
                  src={axios.defaults.baseURL + prod.thumbnail}
                  alt={prod.title}
                  className="product-img"
                />
                <div className="product-title">{prod.title}</div>
                <div className="product-pricing">
                  <span className="price">₹{prod.selling_price}</span>
                  {prod.discount > 0 && (
                    <span className="discount">{prod.discount}% OFF</span>
                  )}
                  <span className="mrp">₹{prod.actual_price}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}

      <NewFooter />
    </>
  )
}

export default NewHome