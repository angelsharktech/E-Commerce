import React, { useEffect, useState } from "react";
import Header from "../pages/Header";
import { Grid, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Footer from "../pages/Footer";
import "./Home.css";
import NewFooter from "../pages/NewFooter";
import SideBar from "./SideBar";

const SearchProduct = () => {
  const { name } = useParams();
  // const product = useFetch(`/product/getProductByName/${name}`)
  // const category = useFetch(`/product/getProductByCategory/${name}`)
  // const subCategory = useFetch(`/product/getProductBySubCategory/${name}`)
  // const mergedData = [...(product.data || []), ...(category.data || [])];

  // console.log('category::',category);

  // Remove duplicates by _id
  // const product.data = Array.from(
  //   new Map(mergedData.map(item => [item._id, item])).values()
  // );

  const [product, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    ageGroups: [],
    brands: [],
    categories: [],
    discount: [],
    priceMin: "",
    priceMax: "",
  });

  // Handle updates from Sidebar
  const updateFilters = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const noFiltersApplied =
          (filters.ageGroups?.length ?? 0) === 0 &&
          (filters.brands?.length ?? 0) === 0 &&
          (filters.categories?.length ?? 0) === 0 &&
          (filters.discount?.length ?? 0) === 0 &&
          !filters.priceMin &&
          !filters.priceMax;

        if (noFiltersApplied) {
          // No filters => fetch all products
          const res = await axios.get(`/product/getProductByName/${name}`);
          setProducts(res.data);
          return;
        } else {
          // Else: apply filters
          const query = new URLSearchParams();

          // Age groups
          filters.ageGroups.forEach((age) => query.append("ageGroups", age));
          filters.brands.forEach((brand) => query.append("brands", brand));
          filters.categories.forEach((cat) => query.append("categories", cat));
          filters.discount.forEach((disc) => query.append("discount", disc));

          if (filters.priceMin) query.append("priceMin", filters.priceMin);
          if (filters.priceMax) query.append("priceMax", filters.priceMax);
          console.log("query:", query);

          const res = await axios.get(`/product/filter?${query.toString()}`);
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [filters]);

  return (
    <>
      <Header />
      <Stack direction={"row"}>
        <SideBar filters={filters} onFilterChange={updateFilters} />
        <div className="product-style">
          <Grid container spacing={3}>
            {product ? (
              product?.map((prod) => (
                <Grid item xs={12} sm={6} md={3} key={prod._id} className="box">
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
                      <span className="price-label">
                        {prod.actual_price} RS.
                      </span>
                      <span className="selling_label">
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
              ))
            ) : (
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh", // adjust height as needed
                  flexDirection: "column",
                }}
              >
                <img
                  src="/not_found.gif"
                  alt="Loading..."
                  style={{ width: "60%", height: "100%" }}
                />
                <h3 style={{ color: "#471396" }}>NO DATA FOUND</h3>
              </div>
            )}
          </Grid>
        </div>
      </Stack>
      <NewFooter />
    </>
  );
};

export default SearchProduct;
