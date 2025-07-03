import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import moment from "moment";
import Header from "../pages/Header";
import NewFooter from "../pages/NewFooter";
import { userInformation } from "../context/AuthContext";
import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import  './Home.css'
import axios from "axios";
import './Order.css'


const Order = () => {
  const { webuser } = useContext(userInformation);
  const orders = useFetch(`/order/getOrderById/${webuser?._id}`);

 const isMobile = useMediaQuery("(max-width:645px)");

  const cancelOrder = async (id) => {
    try {
      const res = await axios.put(`/order/updateOrderStatus/${id}`, {
        orderStatus: "Cancelled",
      });

      orders.refetch(`/order/getOrderById/${webuser?._id}`);
      if (res) {
        const order = await axios.get(`/order/getOrderByOrderId/${id}`);

        order.data?.map(async (cart, index) => {
          cart?.products?.map(async (item, index) => {
            const res = await axios.get(
              `/product/getProductById/${item.product}`
            );
            const qty = res.data.avail_qty + item.quantity;
            if (res.data) {
              const result = await axios.patch(
                `/product/updateProduct/${item.product}`,
                { avail_qty: qty }
              );
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columnWidths = [
    "130px", // Order Date
    "140px", // Payment
    "230px", // Shipping Address
    "100px", // Total Amount
    "200px", // Products
    "120px", // Order Status
    "130px", // Actions
  ];
  return (
    <>
      <Header />

       <Box
        className="main-content"
        sx={{
          marginTop: { xs: "38%", sm: "8%", md: "8%", lg: "12%" },
          width: { xs: "100%", sm: "90%", md: "80%", lg: "60%" },
          mx: "auto",
          px: 2,
        }}
      >
        {!orders.data || orders.data.length === 0 ? (
          <Typography variant="h6">No Orders</Typography>
        ) : (
          <Box sx={{ overflowX: "auto", maxHeight: 500 }}>
            <Table
              size="small"
              sx={{
                minWidth: 650,
                border: "1px solid #ccc",
                tableLayout: "fixed",
              }}
              stickyHeader
            >
              {!isMobile && (
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#b3b2d1" }}>
                    <TableCell>Order Date</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Shipping Address</TableCell>
                    {/* <TableCell>Total</TableCell> */}
                    <TableCell>Products</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {orders.data.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      {moment(order.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>
                      ₹{order.totalAmount}
                      <br/>
                      {order.paymentMethod}
                      <br />
                      {order.paymentStatus}
                    </TableCell>
                    <TableCell>
                      {order.shippingInfo.name}
                      <br />
                      {order.shippingInfo.address}, {order.shippingInfo.pincode}
                      <br />
                      Mob: {order.shippingInfo.mob_no}
                    </TableCell>
                    {/* <TableCell>₹{order.totalAmount}</TableCell> */}
                    <TableCell>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {order.products.map((p) => (
                          <li key={p._id}>{p.product?.title || "N/A"}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <span
                        style={{
                          color:
                            order.orderStatus === "Cancelled"
                              ? "red"
                              : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {order.orderStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        disabled={order.orderStatus === "Cancelled"}
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel Order
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Box>
      <NewFooter />
    </>
  );
};

export default Order;
