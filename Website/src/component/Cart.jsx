import React, { useContext, useEffect, useState } from "react";
import Header from "../pages/Header";
import { userInformation } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Footer from "../pages/Footer";
import NewFooter from "../pages/NewFooter";
import PaymentModal from "./PaymentModal";
import { Close } from "@mui/icons-material";
import { cashOnDeliveryPayment, startRazorpayPayment } from "../utils/payment";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate()
  const RAZORPAY_KEY_ID = "rzp_live_qAVbX1D0dGBDYZ"; // Razorpay key
  const { webuser } = useContext(userInformation);
  const data = useFetch(`/cart/getCartItem/${webuser._id}`);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log('cart::',data);
  
  useEffect(() => {
    if (data?.data?.cart) {
      setCartItems(data.data.cart);

      let tempTotal = 0;
      data.data.cart.map((item) => {
        tempTotal += item.price;

        return null;
      });

      setTotal(tempTotal);
    }
  }, [data]);

  // console.log("cartItems:", cartItems);

  const increaseCount = async (cartId) => {
    // setCartCount
    const updatedCart = cartItems.map((item) =>
      item._id === cartId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCartItems(updatedCart);

    try {
      const updatedItem = updatedCart.find((item) => item._id === cartId);
      const result = await axios.put(`/cart/UpdateCart/${webuser._id}`, {
        _id: updatedItem._id,
        quantity: updatedItem.quantity,
        price: updatedItem.price,
      });
      data.refetch(`/cart/getCartItem/${webuser._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCount = async (cartId) => {
    // setCartCount
    const updatedCart = cartItems.map((item) =>
      item._id === cartId ? { ...item, quantity: item.quantity - 1 } : item
    );

    setCartItems(updatedCart);

    try {
      const updatedItem = updatedCart.find((item) => item._id === cartId);
      const result = await axios.put(`/cart/UpdateCart/${webuser._id}`, {
        _id: updatedItem._id,
        quantity: updatedItem.quantity,
        price: updatedItem.price,
      });
      data.refetch(`/cart/getCartItem/${webuser._id}`);
    } catch (error) {
      console.log(error);
    }
  };

   const handlePaymentMethod = () => {
    try {
      console.log('webUser::',webuser);
      
      if (
        !webuser.name?.trim() ||
        !webuser.email?.trim() ||
        !webuser.mob_no ||
        !webuser.address?.trim() ||
        !webuser.pincode?.trim() ||
        !webuser?.city?.trim() ||
        !webuser?.state?.trim()
      ) {
        alert(
          "Please fill in all required shipping details before proceeding."
        );
        return;
      } else {
        
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      startRazorpayPayment({
        amount: total,
        data: webuser,
        product: cartItems,
        keyId: RAZORPAY_KEY_ID,
        webuser: webuser,
        onSuccess: (savedOrder) => {
          alert("Order placed successfully!");
          const res = axios.delete(`/cart/deleteCart/${data.data._id}`)
          console.log(res);
          navigate("/home");
        },
        onFailure: (err) => {
          console.error("Payment failed or order save failed:", err);
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error in payment setup.");
    }
  };

  const handleCOD = async () => {
    try {
      cashOnDeliveryPayment({
        data: webuser,
        product: cartItems,
        webuser: webuser,
        onSuccess: (savedOrder) => {
          alert("Order placed successfully!");
          const res = axios.delete(`/cart/deleteCart/${data.data._id}`)
          console.log(res);
          
          navigate("/home");
        },
        onFailure: (err) => {
          console.error("Payment failed or order save failed:", err);
        },
      });
    } catch (err) {
      console.error("Error saving order:", err);
      alert("Payment success but failed to save order.");
    }
  };
  
  return (
    <>
      <Header />
      {/* <div>Cart</div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!data.data ? (
          <>
            <h3>Cart is empty</h3>
          </>
        ) : (
          <>
            <table
              style={{ marginTop: "2%", width: "50%" }}
              className="table table-bordered table_bg_white"
            >
              <thead>
                <tr>
                  <th></th>
                  <th>Product name</th>
                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {!data ? (
                  <>
                    <h1>L O A D I N G</h1>
                  </>
                ) : (
                  <>
                    {cartItems.map((cart, index) => (
                      <>
                        <tr>
                          {/* {cart._id} */}
                          <th>
                            {" "}
                            <img
                              src={axios.defaults.baseURL + cart?.thumbnail}
                              style={{ height: "2%", width: "50%" }}
                            />
                          </th>
                          <th>
                            {cart.title}
                            <br />
                            <br />
                            <Box
                              sx={{
                                border: "1px solid grey",
                                width: "fit-content",
                                borderRadius: "10px",
                              }}
                            >
                              <Button
                                onClick={() => increaseCount(cart._id)}
                                size="small"
                              >
                                <AddCircleOutlineIcon />
                              </Button>
                              <label>{cart.quantity}</label>
                              <Button
                                onClick={() => decreaseCount(cart._id)}
                                size="small"
                              >
                                {" "}
                                <RemoveCircleOutlineRoundedIcon />{" "}
                              </Button>
                            </Box>
                          </th>
                          <th>{cart.price}</th>
                        </tr>
                      </>
                    ))}
                  </>
                )}
                <tr>
                  <th></th>
                  <th style={{ float: "right" }}>Total:</th>
                  <th>RS. {total} </th>
                </tr>
              </tbody>
            </table>
            <div style={{ width: "50%" }}>
              <Button
                variant="contained"
                style={{
                  float: "right",
                  backgroundColor: "#471396",
                  borderRadius: "50px",
                }}
                  onClick={() => handlePaymentMethod()}
              >
                Proceed To Pay
              </Button>
            </div>
          </>
        )}
      </div>

      <NewFooter />
      <Modal open={isModalOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            minWidth: 300,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <Button onClick={() => setIsModalOpen(false)}>
              <Close />
            </Button>
          </div>
          <Typography variant="h6" gutterBottom>
            Choose Payment Method
          </Typography>
          <Stack spacing={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsModalOpen(false);
                handleRazorpayPayment(); // Razorpay
              }}
            >
              Pay Online (Razorpay)
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setIsModalOpen(false);
                handleCOD(); // Implement this
              }}
            >
              Cash on Delivery (COD)
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
