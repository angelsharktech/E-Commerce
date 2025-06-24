import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import moment from "moment";
import Header from "../pages/Header";
import NewFooter from "../pages/NewFooter";
import { userInformation } from "../context/AuthContext";
import { Button } from "@mui/material";
import axios from "axios";
const Order = () => {
  const { webuser } = useContext(userInformation);
  const orders = useFetch(`/order/getOrderById/${webuser?._id}`);
  const cancelOrder = async (id) => {
    try {
      const res = await axios.put(`/order/updateOrderStatus/${id}`, {
        orderStatus: "Cancelled",
      });
      // console.log("order status::", res);
      orders.refetch(`/order/getOrderById/${webuser?._id}`);
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
      {/* <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "4%",
          //   width:'90%'
        }}
      >
        {!orders.data ? (
          <>
            <h3>No Orders</h3>
          </>
        ) : (
          <>
            <table border="1" cellPadding="10" cellSpacing="0">
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Payment</th>
                  <th>Shipping Address</th>
                  <th>Total Amount</th>
                  <th>Products</th>
                  <th>Order Status</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {orders.data.map((order) => (
                  <tr key={order._id}>
                    <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                    <td>
                      {order.paymentMethod}
                      <br />
                      {order.paymentStatus}
                    </td>

                    <td>
                      {order.shippingInfo.name} <br />
                      {order.shippingInfo.address}, {order.shippingInfo.pincode}
                      <br />
                      Mob: {order.shippingInfo.mob_no}
                    </td>

                    <td>₹{order.totalAmount}</td>
                    <td>
                      <ul style={{ listStyle: "none" }}>
                        {order.products.map((p) => (
                          <li key={p._id}>
                            {p.product?.title || "N/A"} <br />
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <span
                        style={{
                          color:
                            order.orderStatus === "Cancelled" ? "red" : "green",
                        }}
                      >
                        <b>{order.orderStatus}</b>
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel Order
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          //   justifyContent: "center",
          margin: "40px auto",
        }}
      >
        {!orders.data ? (
          <h3>No Orders</h3>
        ) : (
          <div>
            {/* Header Table */}
            <table
              style={{
                width: "90%",
                borderCollapse: "collapse",
                tableLayout: "fixed",
              }}
              border="1"
              cellPadding="10"
              cellSpacing="0"
            >
              <thead style={{ backgroundColor: "#b3b2d1" }}>
                <tr>
                  {[
                    "Order Date",
                    "Payment",
                    "Shipping Address",
                    "Total Amount",
                    "Products",
                    "Order Status",
                    "",
                  ].map((label, index) => (
                    <th key={index} style={{ width: columnWidths[index] }}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>

            {/* Scrollable Table Body */}
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  tableLayout: "fixed",
                }}
                border="1"
                cellPadding="10"
                cellSpacing="0"
              >
                <tbody>
                  {orders.data.map((order) => (
                    <tr key={order._id}>
                      <td style={{ width: columnWidths[0] }}>
                        {moment(order.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td style={{ width: columnWidths[1] }}>
                        {order.paymentMethod}
                        <br />
                        {order.paymentStatus}
                      </td>
                      <td style={{ width: columnWidths[2] }}>
                        {order.shippingInfo.name}
                        <br />
                        {order.shippingInfo.address},{" "}
                        {order.shippingInfo.pincode}
                        <br />
                        Mob: {order.shippingInfo.mob_no}
                      </td>
                      <td style={{ width: columnWidths[3] }}>
                        ₹{order.totalAmount}
                      </td>
                      <td style={{ width: columnWidths[4] }}>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                          {order.products.map((p) => (
                            <li key={p._id}>
                              {p.product?.title || "N/A"}
                              <br />
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ width: columnWidths[5] }}>
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
                      </td>
                      <td style={{ width: columnWidths[6] }}>
                        {order.orderStatus === "Cancelled" ? (
                          <Button variant="outlined" disabled>
                             Cancel Order
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => cancelOrder(order._id)}
                          >
                            Cancel Order
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <NewFooter />
    </>
  );
};

export default Order;
