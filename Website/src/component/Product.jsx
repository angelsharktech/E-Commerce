import React, { useEffect, useState } from "react";
import Header from "../pages/Header";
import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Link ,useSearchParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Home.css";
import axios from "axios";
import Footer from "../pages/Footer";
import NewFooter from "../pages/NewFooter";
import SideBar from "./SideBar";
import MobileFilterDrawer from "./MobileFilterDrawer";
import FilterListIcon from "@mui/icons-material/FilterList";

const Product = () => {
  // const { data } = useFetch('/product/getProduct')

  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ageGroups: searchParams.getAll("ageGroups"),
    brands: searchParams.getAll("brands"),
    categories: searchParams.getAll("categories"),
    discount: searchParams.getAll("discount"),
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
  });

  const [products, setProducts] = useState([]);

  const isMobile = useMediaQuery("(max-width:645px)"); //Mobile view
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false); //Mobile View
  // Handle updates from Sidebar
  const updateFilters = (newFilter) => {
        setFilters((prev) => {
      const updated = { ...prev, ...newFilter };

      const params = new URLSearchParams();

      updated.ageGroups.forEach((v) => params.append("ageGroups", v));
      updated.brands.forEach((v) => params.append("brands", v));
      updated.categories.forEach((v) => params.append("categories", v));
      updated.discount.forEach((v) => params.append("discount", v));

      if (updated.priceMin) params.set("priceMin", updated.priceMin);
      if (updated.priceMax) params.set("priceMax", updated.priceMax);

      setSearchParams(params); // updates URL

      return updated;
    });
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
          const res = await axios.get("/product/getProduct");
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
  }, [filters]);

  return (
    <>
      <Header />
      {/* Mobile View */}
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
              marginTop: "9%",
              background: "white",
              zIndex: 100,
              width: "90%",
              //  borderBottom: "1px solid #ccc",
            }}
          >
            <Box sx={{ flexGrow: 1 }} /> {/* pushes the button to the right */}
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setFilterDrawerOpen(true)}
              sx={{ marginBottom: "10px" }}
            >
              Filter
            </Button>
          </Stack>

          <Divider />
        </>
      )}

      <Stack direction={"row"}>
        {/* <SideBar filters={filters} onFilterChange={updateFilters} /> */}

        {!isMobile && (
          <Box sx={{ display: "block", marginTop: "8%" }}>
            <SideBar filters={filters} onFilterChange={updateFilters} />
          </Box>
        )}
        <div className="product-style">
          {products.length === 0 ? (
            <p style={{ margin: "2rem", fontWeight: "bold" }}>
              No products found for selected filters.
            </p>
          ) : (
            <Grid container spacing={3}>
              {products?.map((prod) => (
                <Grid item xs={6} sm={4} md={3} key={prod._id} className="box">
                  <Link
                    to={`/prodDetail/${prod._id}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <img
                      src={axios.defaults.baseURL + prod.thumbnail}
                      alt={prod.title}
                      className="img-style"
                    />
                    <p className="title">{prod.title}</p>
                    <p>
                      <span className="selling_label">
                        ₹{prod.selling_price}
                      </span>{" "}
                      <span className="price-label">₹{prod.actual_price}</span>
                    </p>
                    {prod.discount > 0 && (
                      <p className="discount-badge">{prod.discount}% OFF</p>
                    )}
                    <br />
                    {prod.avail_qty < 1 ? (
                      <>
                        <span style={{ color: "red" }}>Out Of Stock</span>
                      </>
                    ) : (
                      <>
                        <span style={{ color: "red" }}>
                          {prod.avail_qty} items left
                        </span>
                      </>
                    )}
                  </Link>
                </Grid>
              ))}
            </Grid>
          )}
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

export default Product;
