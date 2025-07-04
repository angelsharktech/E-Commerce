import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { DataGrid, GridCellEditStopReasons } from "@mui/x-data-grid";
import moment from "moment";
import axios from "axios";

const Order = () => {
  // const orders = useFetch("/order/getOrder");
  const statusOptions = ['Accepted' ,'Shipped', 'Delivered', 'Cancelled'];

 const [orders, setOrders] = useState();
  const [activeStatus, setActiveStatus] = useState("");

  const showOrders = async (status) => {
    try {
      setActiveStatus(status);
      const res = await axios.get(`/order/getOrderByStatus/${status}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
const rows = orders.data?.map((order) => ({
  id: order._id,
  createdAt: moment(order.createdAt).format("DD/MM/YYYY"),
  paymentMethod: order.paymentMethod,
  paymentStatus: order.paymentStatus,
  customer: order.shippingInfo.name,
  email: order.shippingInfo.email,
  mobile: order.shippingInfo.mob_no,
  address: `${order.shippingInfo.address},${order.shippingInfo.city || ""},${
    order.shippingInfo.state || ""
  }, ${order.shippingInfo.pincode}`,
  totalAmount: order.totalAmount,
  totalProducts: order.products.length,
  products: order.products.map((p) => p.product?.title || "N/A").join(", "),
  orderStatus: order.orderStatus,
}));

  const handleProcessRowUpdate = async (updatedRow, oldRow) => {
    if (updatedRow.orderStatus !== oldRow.orderStatus) {
      try {
        const res = await axios.put(
          `/order/updateOrderStatus/${updatedRow.id}`,
          {
            orderStatus: updatedRow.orderStatus,
          }
        );
        // console.log("order status::", res);
        orders.refetch("/order/getOrder");
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    }
    return updatedRow; // required
  };

  const columns = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 180 },
    { field: "paymentMethod", headerName: "Payment Mode", width: 120 },
    { field: "paymentStatus", headerName: "Payment Status", width: 120 },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 200,
      editable: true,
      renderEditCell: (params) => (
        <Autocomplete
          options={statusOptions}
          value={params.value || ""}
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
    { field: "customer", headerName: "Customer", width: 130 },
    { field: "mobile", headerName: "Mobile", width: 140 },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "totalAmount",
      headerName: "Amount (₹)",
      width: 110,
      type: "number",
    },
    { field: "totalProducts", headerName: "Items", width: 100 },
    { field: "products", headerName: "Products", width: 300 },
  ];
  return (
     <>
      <Box
        sx={{
          borderRadius: 4,
          boxShadow: 10,
          background: "white",
          padding: 3,
        }}
      >
        <Typography variant="h5" fontWeight={600} color="#c26afc" gutterBottom>
          Orders List
        </Typography>
        <Stack direction="row" gap={2} mt={3}>
          {[
            { label: "Processing", color: "primary" },
            { label: "Accepted", color: "secondary" },
            { label: "Shipped", color: "inherit" },
            { label: "Delivered", color: "success" },
            { label: "Cancelled", color: "error" },
          ].map(({ label, color }) => (
            <Button
              key={label}
              variant={activeStatus === label ? "contained" : "outlined"}
              color={color}
              onClick={() => showOrders(label)}
            >
              {label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          height: 400,
          width: "100%",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ width: "70vw", height: "100%" }}
        >
          <Grid item xs={12} md={10} lg={8}>
            <div>
              {!orders ? (
                <Typography variant="h3" color="#177bad">
                  L O A D I N G. . .
                </Typography>
              ) : (
                <Card
                  sx={{
                    borderRadius: 4,
                    boxShadow: 10,
                    background: "white",
                    mt: 1,
                  }}
                >
                  <CardContent>
                    <div style={{ height: "450px", width: "100%" }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        getRowId={(row) => row.id}
                        sx={{
                          borderRadius: 2,
                          boxShadow: 2,
                          background: "#f9f9fb",
                          minWidth: 200,
                        }}
                        processRowUpdate={handleProcessRowUpdate}
                        experimentalFeatures={{ newEditingApi: true }}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>
      
    </>
  );
};

export default Order;
