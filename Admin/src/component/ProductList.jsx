import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Close } from "@mui/icons-material";
import useFetch from "../hooks/useFetch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProductList = () => {
  const product = useFetch("/product/getProduct");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const age_groups = [
    { value: "0 - 1 years", label: "Up to 12 months" },
    { value: "1 - 2 years", label: "1 - 2 years" },
    { value: "3 - 4 years", label: "3 - 4 years" },
    { value: "5 - 7 years", label: "5 - 7 years" },
    { value: "8 - 11 years", label: "8 - 11 years" },
    { value: "12+ years", label: "12 years & more" },
  ];

  const updateProduct = async (newRow, oldRow) => {
    try {
      const updatedFields = {};
      if (
        newRow.actual_price !== oldRow.actual_price ||
        newRow.selling_price !== oldRow.selling_price
      ) {
        const actual = parseFloat(newRow.actual_price);
        const selling = parseFloat(newRow.selling_price);

        const discount =
          actual && selling
            ? Math.round(((actual - selling) / actual) * 100)
            : 0;

        updatedFields.actual_price = actual;
        updatedFields.selling_price = selling;
        updatedFields.discount = discount;
      }

      // Add any other fields that changed
      if (newRow.brand !== oldRow.brand) {
        updatedFields.brand = newRow.brand?.trim();
      }
      if (newRow.title !== oldRow.title) {
        updatedFields.title = newRow.title?.trim();
      }
      if (newRow.category !== oldRow.category) {
        updatedFields.category = newRow.category?.trim();
      }
      if (newRow.description !== oldRow.description) {
        updatedFields.description = newRow.description?.trim();
      }
      if (newRow.age_group !== oldRow.age_group) {
        updatedFields.age_group = newRow.age_group?.value;
      }
      if (newRow.avail_qty !== oldRow.avail_qty) {
        updatedFields.avail_qty = newRow.avail_qty;
      }
      if (newRow.no_of_pieces !== oldRow.no_of_pieces) {
        updatedFields.no_of_pieces = newRow.no_of_pieces;
      }
      if (newRow.assembly_req !== oldRow.assembly_req) {
        updatedFields.assembly_req = newRow.assembly_req?.trim();
      }
      if (newRow.scale !== oldRow.scale) {
        updatedFields.scale = newRow.scale?.trim();
      }
      if (newRow.battery_req !== oldRow.battery_req) {
        updatedFields.battery_req = newRow.battery_req;
      }
      if (newRow.battery_incl !== oldRow.battery_incl) {
        updatedFields.battery_incl = newRow.battery_incl;
      }
      if (newRow.material_type !== oldRow.material_type) {
        updatedFields.material_type = newRow.material_type?.trim();
      }
      if (newRow.remote_control !== oldRow.remote_control) {
        updatedFields.remote_control = newRow.remote_control;
      }
      if (newRow.colour !== oldRow.colour) {
        updatedFields.colour = newRow.colour?.trim();
      }
      if (newRow.prod_dimensions !== oldRow.prod_dimensions) {
        updatedFields.prod_dimensions = newRow.prod_dimensions?.trim();
      }
      if (newRow.manufacturer_recommend_age !== oldRow.manufacturer_recommend_age) {
        updatedFields.manufacturer_recommend_age = newRow.manufacturer_recommend_age?.trim();
      }
      if (newRow.manufacturer_name !== oldRow.manufacturer_name) {
        updatedFields.manufacturer_name = newRow.manufacturer_name?.trim();
      }
      if (newRow.item_weight !== oldRow.item_weight) {
        updatedFields.item_weight = newRow.item_weight?.trim();
      }
      if (newRow.net_qty !== oldRow.net_qty) {
        updatedFields.net_qty = newRow.net_qty;
      }
      if (newRow.packer !== oldRow.packer) {
        updatedFields.packer = newRow.packer?.trim();
      }
      if (newRow.isFavourite !== oldRow.isFavourite) {
        updatedFields.isFavourite = newRow.isFavourite;
      }
      
      // Add more comparisons as needed...

      const result = await axios.patch(
        `/product/updateProduct/${newRow._id}`,
        updatedFields
      );

      if (result) {
        alert("Product Updated Successfully");
        product.refetch("/product/getProduct");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (row) => {
    try {
      setOpen(true);
      setData(row);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = () => {
    setOpen(false);
    setData(null);
  };

  const confirmDeleteProduct = async () => {
    try {
      setOpen(false);
      const result = await axios.delete(
        `/product/deleteProduct/${data._id}`,
        data
      );
      if (result.data.msg === "Product Deleted successfully...") {
        alert(result.data.msg);
        product.refetch("/product/getProduct");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const prod_columns = [
    {
      field: "thumbnail",
      headerName: "Image",
      renderCell: (params) => (
        <>
          <img
            src={axios.defaults.baseURL + params?.row?.thumbnail}
            height={"50px"}
            width={"75px"}
            style={{ borderRadius: 8 }}
          />
        </>
      ),
      width: 150,
    },
    { field: "title", headerName: "Title", width: 120, editable: true },
    { field: "brand", headerName: "Brand", width: 120, editable: true },
    { field: "category", headerName: "Category", width: 120, editable: true },
    {
      field: "age_group",
      headerName: "Age Group",
      width: 200,
      editable: true,
      renderEditCell: (params) => (
        <Autocomplete
          options={age_groups}
          value={params.value || ""}
          getOptionLabel={(option) => option?.value || ''}
          popupIcon={<ExpandMoreIcon />}
          onChange={(event, newValue) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue,
            });
            params.api.stopCellEditMode({
              id: params.id,
              field: params.field,
              reason: GridCellEditStopReasons.enterKeyDown,
            });
          }}
          renderInput={(paramsInput) => (
            <TextField {...paramsInput} variant="standard" />
          )}
          fullWidth
        />
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: 190,
      editable: true,
    },
    { field: "actual_price", headerName: "MRP", width: 120, editable: true },
    {
      field: "selling_price",
      headerName: "Price Rs.",
      width: 120,
      editable: true,
    },
    { field: "discount", headerName: "Discount %", width: 120 },
    {
      field: "avail_qty",
      headerName: "Available Quantity",
      width: 120,
      editable: true,
    },
     { field: "no_of_pieces", headerName: "No Of Pieces", width: 120, editable: true },
     { field: "assembly_req", headerName: "Assembly Required", width: 120, editable: true },
     { field: "scale", headerName: "Scale", width: 120, editable: true },
     { field: "battery_req", headerName: "Batteries Required", width: 120, editable: true },
     { field: "battery_incl", headerName: "Batteries Included", width: 120, editable: true },
     { field: "material_type", headerName: "Material Type", width: 120, editable: true },
     { field: "remote_control", headerName: "Remote Control", width: 120, editable: true },
     { field: "colour", headerName: "Color", width: 120, editable: true },
     { field: "prod_dimensions", headerName: "Product Dimensions", width: 120, editable: true },
     { field: "manufacturer_recommend_age", headerName: "Manf.Recommended Age", width: 120, editable: true },
     { field: "manufacturer_name", headerName: "Manufacturer", width: 120, editable: true },
     { field: "item_weight", headerName: "Item Weight", width: 120, editable: true },
     { field: "net_qty", headerName: "Net Qty", width: 120, editable: true },
     { field: "packer", headerName: "Packer", width: 120, editable: true },
     { field: "isFavourite", headerName: "isFavourite", width: 120, editable: true },
     
     {
       field: "action",
       headerName: "Delete",
       renderCell: (params) => (
         <>
          <Button
            sx={{ color: " #c26afc" }}
            onClick={() => deleteProduct(params?.row)}
            >
            <DeleteIcon />
          </Button>
        </>
      ),
      width: 120,
    },
  ];
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "70vw", height: "100%" }}
      >
        <Grid item xs={12} md={10} lg={8}>
          <Card
            sx={{ borderRadius: 4, boxShadow: 10, background: "white", mt: 5 }}
          >
            <CardContent>
              <Typography
                variant="h5"
                fontWeight={600}
                color="#c26afc"
                gutterBottom
              >
                Product List
              </Typography>
              <div style={{ height: "500px", width: "100%" }}>
                {!product ? (
                  <Typography variant="body1" color="text.secondary">
                    L O A D I N G
                  </Typography>
                ) : (
                  <DataGrid
                    rows={product.data}
                    columns={prod_columns}
                    getRowId={(row) => row._id}
                    processRowUpdate={updateProduct}
                    sx={{
                      borderRadius: 2,
                      boxShadow: 2,
                      background: "#f9f9fb",
                    }}
                    // onProcessRowUpdateError={(error) => {
                    //   console.error("Row update failed:", error);
                    //   alert("Failed to update product. Please try again.");
                    // }}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={open}
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <div>
          <Box
            sx={{
              color: "black",
              mt: "60%",
              p: "20px",
              border: "3px solid white",
              borderRadius: "20px",
              backgroundColor: "white",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => setOpen(false)}>
                <Close />
              </Button>
            </div>
            <h3>Do you want to confirm delete this product?</h3>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
                color: "whitesmoke",
                float: "right",
              }}
              type="submit"
              onClick={() => confirmDeleteProduct()}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
                color: "whitesmoke",
                float: "right",
                marginRight: "10px",
              }}
              onClick={() => handleChange()}
            >
              No
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ProductList;
