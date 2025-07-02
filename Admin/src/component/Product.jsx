import React, { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./product.css";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { DataGrid } from "@mui/x-data-grid";

import { userInformation } from "../context/AuthContext";

const Product = () => {
  const { user } = useContext(userInformation);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const category = useFetch("/category/getCategory");
  console.log("category", category.data);

  const [data, setData] = useState({
    title: "",
    description: "",
    actual_price: "",
    selling_price: "",
    avail_qty: "",
    brand: "",
    age_group: "",
    productBy: "",
    // mainCategory: "",
    // subCategory: "",
    category: "",
    thumbnail: "",
    images: [],
    no_of_pieces: "",
    assembly_req: "",
    scale: "",
    battery_req: "",
    battery_incl: "",
    material_type: "",
    remote_control: "",
    colour: "",
    prod_dimensions: "",
    manufacturer_recommend_age: "",
    manufacturer: "",
    item_weight: "",
    net_qty: "",
    packer: "",
    isFavourite: "",
  });

  const age_groups = [
    { value: "0 - 1 Yr", label: "Up to 12 months" },
    { value: "1 - 2 Yr", label: "1 - 2 years" },
    { value: "3 - 4 Yr", label: "3 - 4 years" },
    { value: "5 - 7 Yr", label: "5 - 7 years" },
    { value: "8 - 11 Yr", label: "8 - 11 years" },
    { value: "12+ Yr", label: "12 years & more" },
  ];
  const options = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  // useEffect(() => {
  //   const matched = category?.data?.find(
  //     (item) => item.mainCategory === data.mainCategory
  //   );

  //   setSubCategoryOptions(matched?.subCategories || []);
  // }, [data.mainCategory, category.data]);

  const onSubmit = async () => {
    try {
      const actual = parseFloat(data.actual_price);
      const selling = parseFloat(data.selling_price);
      const discount =
        actual && selling ? Math.round(((actual - selling) / actual) * 100) : 0;
      console.log("Discount:", discount);
      data.discount = discount;
      data.productBy = user?.shop_name;
      const formData = new FormData();
      formData.append("title", data.title);
      // formData.append("mainCategory", data.mainCategory);
      // formData.append("subCategory", data.subCategory);
      formData.append("category", data.category);
      formData.append("productBy", data.productBy);
      formData.append("description", data.description);
      formData.append("actual_price", data.actual_price);
      formData.append("selling_price", data.selling_price);
      formData.append("discount", data.discount);
      formData.append("avail_qty", data.avail_qty);
      formData.append("brand", data.brand);
      formData.append("age_group", data.age_group);
      formData.append("thumbnail", data.thumbnail);
      formData.append("no_of_pieces", data.no_of_pieces);
      formData.append("assembly_req", data.assembly_req);
      formData.append("scale", data.scale);
      formData.append("battery_req", data.battery_req);
      formData.append("battery_incl", data.battery_incl);
      formData.append("material_type", data.material_type);
      formData.append("remote_control", data.remote_control);
      formData.append("colour", data.colour);
      formData.append("prod_dimensions", data.prod_dimensions);
      formData.append(
        "manufacturer_recommend_age",
        data.manufacturer_recommend_age
      );
      formData.append("manufacturer", data.manufacturer);
      formData.append("item_weight", data.item_weight);
      formData.append("net_qty", data.net_qty);
      formData.append("packer", data.packer);
      formData.append("isFavourite", data.isFavourite);

      data.images?.forEach((images) => {
        formData.append("images", images);
      });
      const result = await axios.post("/product/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.data.msg === "Product Added") {
        alert(result.data.msg);
        // product.refetch('/product/getproduct')
        setData({
          title: "",
          // mainCategory: "",
          // subCategory : "",
          description: "",
          actual_price: "",
          selling_price: "",
          thumbnail: "",
          category: "",
          avail_qty: "",
          brand: "",
          age_group: "",
          no_of_pieces: "",
          assembly_req: "",
          scale: "",
          battery_req: "",
          battery_incl: "",
          material_type: "",
          remote_control: "",
          colour: "",
          prod_dimensions: "",
          manufacturer_recommend_age: "",
          manufacturer: "",
          item_weight: "",
          net_qty: "",
          packer: "",
          isFavourite: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "70vw" }}
    >
      <Grid item xs={12} md={10} lg={8}>
        <Card
          sx={{ borderRadius: 4, boxShadow: 10, background: "white", mt: 5 }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={700}
              color="#c26afc"
              gutterBottom
            >
              Product Upload
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Title"
                  name={"title"}
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  size="small"
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="MRP"
                  name={"actual_price"}
                  type="Number"
                  value={data.actual_price}
                  onChange={(e) =>
                    setData({ ...data, actual_price: e.target.value })
                  }
                  size="small"
                  fullWidth
                />
                <TextField
                  variant="outlined"
                  label="Selling Price"
                  name={"selling_price"}
                  type="Number"
                  value={data.selling_price}
                  onChange={(e) =>
                    setData({ ...data, selling_price: e.target.value })
                  }
                  size="small"
                  fullWidth
                />
                {/* Main Category Autocomplete */}
                {/* <Autocomplete
                  sx={{ minWidth: 200 }}
                  options={category.data || []}
                  value={data.mainCategory }
                  getOptionLabel={(option) => option.mainCategory || ""}
                  onChange={(e, newValue) => {
                    setData({
                      ...data,
                      mainCategory: newValue?.mainCategory || "",
                      subcategory: "",
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Main Category" size="small" />
                  )}
                /> */}

                {/* Sub Category Autocomplete */}
                {/* <Autocomplete
                  sx={{ minWidth: 200 }}
                  options={subCategoryOptions}
                  value={data.subCategory || null}
                  onChange={(e, newValue) => {
                    setData({ ...data, subCategory: newValue || "" });
                  }}
                  getOptionLabel={(option) => option || ""}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderInput={(params) => (
                    <TextField {...params} label="Sub-Category" size="small" />
                  )}
                /> */}
                <Autocomplete
                  sx={{ minWidth: 160 }}
                  options={category.data || []}
                  getOptionLabel={(option) => option?.categoryName || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, category: newValue?.categoryName || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="category"
                      label="Category"
                      size="small"
                    />
                  )}
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={age_groups || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({
                      ...data,
                      age_group: newValue?.categoryName || "",
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="age_group"
                      label="Age Group"
                      size="small"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Brand"
                  name={"brand"}
                  value={data.brand}
                  onChange={(e) => setData({ ...data, brand: e.target.value })}
                  size="small"
                  // fullWidth
                  style={{ width: "330px" }}
                />
                <TextField
                  variant="outlined"
                  label="Available Quantity"
                  name={"avail_qty"}
                  type="Number"
                  value={data.avail_qty}
                  onChange={(e) =>
                    setData({ ...data, avail_qty: e.target.value })
                  }
                  size="small"
                  style={{ width: "330px" }}
                />
                <TextField
                  variant="outlined"
                  label="Description"
                  name={"description"}
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  size="small"
                  fullWidth
                  multiline
                  minRows={4}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Number Of Pieces"
                  name={"no_of_pieces"}
                  type="Number"
                  value={data.no_of_pieces}
                  onChange={(e) =>
                    setData({ ...data, no_of_pieces: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={options || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, assembly_req: newValue?.value || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="assembly_req"
                      label="Assembly Request"
                      size="small"
                    />
                  )}
                />
                <TextField
                  variant="outlined"
                  label="Scale"
                  name={"scale"}
                  type="text"
                  value={data.scale}
                  onChange={(e) => setData({ ...data, scale: e.target.value })}
                  size="small"
                  fullwidth
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={options || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, battery_req: newValue?.value || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="battery_req"
                      label="Batteries Required"
                      size="small"
                    />
                  )}
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={options || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, battery_incl: newValue?.value || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="battery_incl"
                      label="Batteries Included"
                      size="small"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Material Type"
                  name={"material_type"}
                  type="text"
                  value={data.material_type}
                  onChange={(e) =>
                    setData({ ...data, material_type: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={options || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, remote_control: newValue?.value || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="remote_control"
                      label="Remote Control"
                      size="small"
                    />
                  )}
                />
                <TextField
                  variant="outlined"
                  label="Colour"
                  name={"colour"}
                  type="text"
                  value={data.colour}
                  onChange={(e) => setData({ ...data, colour: e.target.value })}
                  size="small"
                  fullwidth
                />
                <TextField
                  variant="outlined"
                  label="Product Dimensions"
                  name={"prod_dimensions"}
                  type="text"
                  value={data.prod_dimensions}
                  onChange={(e) =>
                    setData({ ...data, prod_dimensions: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
                <TextField
                  variant="outlined"
                  label=" Manufacturer "
                  name={"manufacturer"}
                  type="text"
                  value={data.manufacturer}
                  onChange={(e) =>
                    setData({ ...data, manufacturer: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  variant="outlined"
                  label="Manf.  Recommended Age"
                  name={"manufacturer_recommend_age"}
                  type="text"
                  value={data.manufacturer_recommend_age}
                  onChange={(e) =>
                    setData({
                      ...data,
                      manufacturer_recommend_age: e.target.value,
                    })
                  }
                  size="small"
                  fullwidth
                />
                <TextField
                  variant="outlined"
                  label="Item Weight"
                  name={"item_weight"}
                  type="text"
                  value={data.item_weight}
                  onChange={(e) =>
                    setData({ ...data, item_weight: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
                <TextField
                  variant="outlined"
                  label="Net Quantity"
                  name={"net_qty"}
                  type="Number"
                  value={data.net_qty}
                  onChange={(e) =>
                    setData({ ...data, net_qty: e.target.value })
                  }
                  size="small"
                  fullwidth
                />
                <TextField
                  variant="outlined"
                  label="Packer"
                  name={"packer"}
                  type="text"
                  value={data.packer}
                  onChange={(e) => setData({ ...data, packer: e.target.value })}
                  size="small"
                  fullwidth
                />
                <Autocomplete
                  sx={{ minWidth: 180 }}
                  options={options || []}
                  getOptionLabel={(option) => option?.value || ""}
                  onChange={(e, newValue) =>
                    setData({ ...data, isFavourite: newValue?.value || "" })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="isFavourite"
                      label="Favourite"
                      size="small"
                    />
                  )}
                />
              </Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
              >
                <label style={{ fontWeight: 500 }}>Select Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) =>
                    setData({ ...data, thumbnail: e.target.files[0] })
                  }
                  style={{ marginRight: 16 }}
                />
                <label style={{ fontWeight: 500 }}>Select Images</label>
                <input
                  type="file"
                  multiple
                  name="images"
                  onChange={(e) =>
                    setData({ ...data, images: Array.from(e.target.files) })
                  }
                  style={{ marginRight: 16 }}
                />

                <Button
                  variant="contained"
                  onClick={onSubmit}
                  sx={{
                    background:
                      "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
                    color: "whitesmoke",
                    fontWeight: 600,
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Divider sx={{ my: 4 }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Product;

// material_type
// remote_control
// colour
// prod_dimensions
// manufacturer_recommend_age
// manufacturer_name
// item_weight
// net_qty
// packer
