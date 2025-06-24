import React, { useEffect, useState } from "react";
import Header from "../pages/Header";
import "./Home.css";
import useFetch from "../hooks/useFetch";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import NewFooter from "../pages/NewFooter";

// Add at the top of your Home.jsx or in your main index.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const { data } = useFetch("/product/getProduct");
  const category = useFetch("/category/getCategory");
  const displayedProducts = data?.slice(0, 5);
  return (
    <>
      <Header />
      <div className="carousel-container">
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="0.1" // 0.5 seconds
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="/car.jpg"
                alt="First slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="new.png"
                alt="Second slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/Toy-Names-For-Kids.jpg"
                alt="Third slide"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src="/educational_toys.jpg"
                alt="Fourth slide"
              />
            </div>
          </div>
          <a
            className=" carousel-control-prev"
            href="#carouselExampleInterval"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              style={{ alignItems: "center" }}
            >
              {" "}
            </span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className=" carousel-control-next"
            href="#carouselExampleInterval"
            role="button"
            data-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div style={{ marginLeft: "2% ", textAlign: "center", marginTop: "2%" }}>
        <h1>Products</h1>

        <Grid container spacing={3} sx={{ marginTop: "2%" }}>
          {displayedProducts?.map((prod) => (
            <Grid item xs={6} sm={6} md={3} key={prod._id} className="box">
              <Link
                style={{ color: "black", textDecoration: "none" }}
                to={`/prodDetail/${prod._id}`}
              >
                <img
                  src={axios.defaults.baseURL + prod.thumbnail}
                  className="img-style"
                  alt={prod.title}
                />
                <p className="title">{prod.title}</p>
                <p>
                  <span className="price-label">{prod.actual_price} RS.</span>
                  <span
                    style={{
                      color: "#43a047",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                  >
                    {prod.selling_price} RS.
                  </span><br/>
                  {prod.discount > 0 && (
                    <span className="discount-badge">{prod.discount}% OFF</span>
                  )}
                </p>
              </Link>
            </Grid>
          ))}
          <Grid
            item
            xs={6}
            sm={6}
            md={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link
              to={"/product"}
              className="discount-badge"
              style={{
                textDecoration: "none",
              
              }}
            >
              View More
            </Link>
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          // marginLeft: "2%",
          textAlign: "center",
          marginTop: "2%",
          width: "100%",
        }}
      >
        <h1>Category</h1>
        <Slider
          dots={false}
          infinite={false}
          speed={500}
          slidesToShow={6}
          slidesToScroll={2}
          swipeToSlide={true}
          arrows={true}
          responsive={[
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 900, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
          ]}
        >
          {category.data?.map((cat) => (
            <div key={cat._id} style={{ padding: 8 }}>
              <div
                className="category-box"
              >
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/category/${cat.categoryName}`}
                  // to={`/category/${cat.mainCategory}`}
                >
                  <p className="cat-title">{cat.categoryName}</p>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <NewFooter />
    </>
  );
};

export default Home;
