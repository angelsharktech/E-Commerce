import React, { useEffect, useState } from "react";
import Header from "../pages/Header";
import "./Home.css";
import useFetch from "../hooks/useFetch";
import { Box, Grid, Pagination, Paper, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import NewFooter from "../pages/NewFooter";

// Add at the top of your Home.jsx or in your main index.js
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Carousel from "react-material-ui-carousel";

const Home = () => {
  const { data } = useFetch("/product/getProduct");
  const category = useFetch("/category/getCategory");

  const itemsPerPage = 70;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Slice products for current page
  const currentProducts = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to top
  };
  const items = [
    { src: "/car.jpg", alt: "First slide" },
    { src: "/new.png", alt: "Second slide" },
    { src: "/Toy-Names-For-Kids.jpg", alt: "Third slide" },
    { src: "/educational_toys.jpg", alt: "Fourth slide" },
  ];
  return (
    <>
      <div container>
        <Header />
        <div className="main-content">
          <div className="main-category-slider">
            <h1>Category</h1>
            <Slider
              initialSlide={0}
              centerMode={false}
              dots={false}
              // infinite={false}
              speed={500}
              slidesToShow={6}
              slidesToScroll={2}
              swipeToSlide={true}
              arrows={true}
              responsive={[
                { breakpoint: 1200, settings: { slidesToShow: 8 } },
                { breakpoint: 900, settings: { slidesToShow: 4 } },
                { breakpoint: 600, settings: { slidesToShow: 3 } },
                { breakpoint: 400, settings: { slidesToShow: 2 } },
              ]}
            >
              {category.data?.map((cat) => (
                <div
                  className="slice-track"
                  key={cat._id}
                  style={{ padding: 8 }}
                >
                  <div className="category-box">
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
          
          <div className="main-category-bar">
            {category.data?.map((cat) => (
              <div  key={cat._id} style={{ padding: 8 }}>
                <div className="category-box">
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
          </div>
        </div>

        <div
          style={{ marginLeft: "4% ", textAlign: "center", marginTop: "2%" }}
        >
          <h1>Products</h1>

          <Grid container spacing={3} sx={{ marginTop: "2%" }}>
            {currentProducts?.map((prod) => (
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
                    </span>
                    <br />
                    {prod.discount > 0 && (
                      <span className="discount-badge">
                        {prod.discount}% OFF
                      </span>
                    )}
                  </p>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Stack spacing={2} sx={{ my: 4, alignItems: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handleChange}
              color="#471396"
            />
          </Stack>
        </div>

        {/* <Box className="carousel-container" sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <Carousel
        autoPlay={true} 
        // navButtonsAlwaysVisible
        animation="slide"
        indicators={false}
        interval={2000}
        duration={500}
      >
        {items.map((item, i) => (
          <Paper key={i} elevation={3}>
            <img
              src={item.src}
              alt={item.alt}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </Paper>
        ))}
      </Carousel>
    </Box> */}

        <NewFooter />
      </div>
    </>
  );
};

export default Home;
