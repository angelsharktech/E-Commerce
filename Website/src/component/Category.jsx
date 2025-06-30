import React, { useEffect, useState } from 'react'
import Header from '../pages/Header'
import useFetch from '../hooks/useFetch'
import { Grid, Stack } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import './Home.css'
// import './Category.css'
import axios from 'axios'
import NewFooter from '../pages/NewFooter'
import SideBar from './SideBar'

const Category = () => {
  const { name } = useParams()
  // const category = useFetch(`/category/getCategoryByMainCategory/${name}`);
  // const product = useFetch(`/product/getProductByCategory/${name}`)
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
          const res = await axios.get(`/product/getProductByCategory/${name}`);
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
    {/* Subcategory bar */}
    
{/* <div className="category-bar">
  {category.data?.result?.map((cat) =>
    cat.subCategories?.map((sub, idx) => (
      <Link
        key={cat._id + '-' + idx}
        to={`/subcategory/${cat.mainCategory}/${sub}`}
        className="category-item"
      >
        {sub}
  
      </Link>
    ))
  )}
</div> */}
 <Stack direction={"row"}>
        <SideBar filters={filters} onFilterChange={updateFilters} />
       <div  className='product-style'>
      {product?.length > 0 ? (
        <div style={{ textAlign: 'center', marginTop: '1%', marginLeft: '3%' }}>
          <Grid container spacing={12} >
             {product?.map((prod) => (
                    <Grid item xs={12} sm={6} md={3} key={prod._id} className='box'>
                      <Link style={{ color: 'black', textDecoration: 'none' }} to={`/prodDetail/${prod._id}`}>
                        <img src={axios.defaults.baseURL + prod.thumbnail} className='img-style' alt={prod.title} />
                        <p className='title'>{prod.title}</p>
                        <p>
                          <span className="price-label">{prod.actual_price} RS.</span>
                          <span style={{ color: '#43a047', fontWeight: 'bold', fontSize: '1.1rem' }}>{prod.selling_price} RS.</span><br/>
                          {prod.discount > 0 && (
                            <span className="discount-badge">{prod.discount}% OFF</span>
                          )}
                        </p>
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

          <img src="/not_found.gif" alt="Loading..." style={{ width: '60%',height:'100%' }} />
          <h3 style={{color:'#471396'}}>NO DATA FOUND</h3>
       
        </div>
      )}
      </div>
      </Stack>
      <NewFooter />
    </>
  )
}

export default Category