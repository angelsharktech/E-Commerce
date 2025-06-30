import React from "react";
import "./Sidebar.css"; // Import the CSS file
import { Button, Stack } from "@mui/material";
import useFetch from "../hooks/useFetch";

const Sidebar = ({ filters, onFilterChange }) => {
  const isAnyFilterApplied =
    filters.ageGroups.length > 0 ||
    filters.brands.length > 0 ||
    filters.categories.length > 0 ||
    filters.discount.length > 0 ||
    filters.priceMin ||
    filters.priceMax;
  const handleClearFilters = () => {
    onFilterChange({
      ageGroups: [],
      brands: [],
      categories: [],
      discount: [],
      priceMin: "",
      priceMax: "",
    });
  };
  const category = useFetch("/category/getCategory");

  const age_groups = [
    { value: "0 - 1 years", label: "0 - 1 years" },
    { value: "1 - 2 years", label: "1 - 2 years" },
    { value: "3 - 4 years", label: "3 - 4 years" },
    { value: "5 - 7 years", label: "5 - 7 years" },
    { value: "8 - 11 years", label: "8 - 11 years" },
    { value: "12+ years", label: "12 years & more" },
  ];
  const brands = [
    { value: "Storio", label: "Storio" },
    { value: "VGRASSP", label: "VGRASSP" },
    { value: "Toy Imagine", label: "Toy Imagine" },
    { value: "Cable World", label: "Cable World" },
    { value: "GRAPHENE", label: "GRAPHENE" },
    { value: "RATNA'S", label: "RATNA'S" },
    { value: "Toyshine", label: "Toyshine" },
  ];
  const discount = [
    { value: "10% Off or more", label: "10" },
    { value: "25% Off or more", label: "25" },
    { value: "35% Off or more", label: "35" },
    { value: "50% Off or more", label: "50" },
    { value: "60% Off or more", label: "60" },
    { value: "70% Off or more", label: "70" },
  ];
  const handleCheckboxChange = (key, value) => {
    const current = filters[key] || [];
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    onFilterChange({ [key]: updated });
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({ [type]: value });
  };
  return (
    <>
      <div className="sidebar-container">
        <h2 className="sidebar-title">Filters</h2>

        {/* Delivery Day */}
        {/* <div className="filter-section">
        <h3 className="filter-heading">Delivery Day</h3>
        {["Get It Today", "Get It by Tomorrow", "Get It in 2 Days"].map((label) => (
          <div key={label} className="checkbox-row">
            <input type="checkbox" />
            <label>{label}</label>
          </div>
        ))}
      </div> */}

        {/* Age */}
        <div className="filter-section">
          <h3 className="filter-heading">Age</h3>
          {age_groups.map((label) => (
            <div key={label.value} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters?.ageGroups?.includes(label.value)} // ✅ proper key
                onChange={() => handleCheckboxChange("ageGroups", label.value)} // ✅ connected
              />
              <label>{label.value}</label>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="filter-section">
          <h3 className="filter-heading">Price</h3>
          <input
            type="number"
            placeholder="Min ₹"
            value={filters?.priceMin}
            onChange={(e) => handlePriceChange("priceMin", e.target.value)}
            style={{ borderRadius:'14px'}}
          />
          <input
            type="number"
            placeholder="Max ₹"
            value={filters?.priceMax}
            onChange={(e) => handlePriceChange("priceMax", e.target.value)}
            style={{ marginTop: "4px" ,borderRadius:'14px'}}
          />
        </div>

        {/* Discount */}
        <div className="filter-section">
          <h3 className="filter-heading">Discount</h3>
          {discount.map((label) => (
            <div key={label.label} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters?.discount?.includes(label.label)} // ✅ proper key
                onChange={() => handleCheckboxChange("discount", label.label)} // ✅ connected
              />
              <label>{label.value}</label>
            </div>
          ))}
        </div>

        {/* category */}
        <div className="filter-section">
          <h3 className="filter-heading">Category</h3>
          {category.data?.map((label) => (
            <div key={label._id} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters?.categories?.includes(label.categoryName)} // ✅ proper key
                onChange={() =>
                  handleCheckboxChange("categories", label.categoryName)
                } // ✅ connected
              />
              <label>{label.categoryName}</label>
            </div>
          ))}
        </div>

        {/* Brands */}
        <div className="filter-section">
          <h3 className="filter-heading">Brand</h3>
          {brands.map((label) => (
            <div key={label.value} className="checkbox-row">
              <input
                type="checkbox"
                checked={filters?.brands.includes(label.value)} // ✅ proper key
                onChange={() => handleCheckboxChange("brands", label.value)} // ✅ connected
              />
              <label>{label.value}</label>
            </div>
          ))}
        </div>
        {isAnyFilterApplied && (
          <Button
            sx={{ color: "red", mt: 2 }}
            variant="outlined"
            onClick={handleClearFilters}
            fullWidth
          >
            Clear Filters
          </Button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
