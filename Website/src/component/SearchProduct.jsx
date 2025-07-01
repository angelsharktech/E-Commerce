import React, { useEffect, useState } from "react";
import Header from "../pages/Header";
import { Box, Grid, Stack,Button, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import Footer from "../pages/Footer";
import "./Home.css";
import NewFooter from "../pages/NewFooter";
import SideBar from "./SideBar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import FilterListIcon from "@mui/icons-material/FilterList";

const SearchProduct = () => {
  const { name } = useParams();
  // const product = useFetch(`/product/getProductByName/${name}`)
  // const category = useFetch(`/product/getProductByCategory/${name}`)
  // const subCategory = useFetch(`/product/getProductBySubCategory/${name}`)
  // const mergedData = [...(product.data || []), ...(category.data || [])];

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
 const isMobile = useMediaQuery("(max-width:645px)"); //Mobile view
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);  //Mobile View
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

          const res = await axios.get(`/product/filter?${query.toString()}`);
          setProducts(res.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [name,filters]);

  return (
    <>
      <Header />
       {isMobile && (
        <>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 2,
              pt: 2,
              position: "fixed",
              top: "60px",
              background: "white",
              zIndex: 100,
              width: "100%",
              marginTop:'5%',
              //  borderBottom: "1px solid #ccc",
            }}
          >
            <Box sx={{ flexGrow: 1 }} /> {/* pushes the button to the right */}
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setFilterDrawerOpen(true)}
               sx={{marginBottom:'10px'}}
            >
              Filter
            </Button>
          </Stack>

        </>
      )}
      <Stack direction={"row"}>
       
        {!isMobile && (
          <Box sx={{ display: "block", marginTop: "8%" }}>
            <SideBar filters={filters} onFilterChange={updateFilters} />
          </Box>
        )}
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

       <MobileFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={updateFilters}
      />
      <NewFooter />
    </>
  );
};

export default SearchProduct;
