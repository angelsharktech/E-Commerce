import React, { useContext, useEffect, useState } from "react";
import Header from "../pages/Header";
import {
  Stack,
  Button,
  TextField,
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { userInformation } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import axios from "axios";
import "./Buynow.css";
import NewFooter from "../pages/NewFooter";
import { startRazorpayPayment,cashOnDeliveryPayment } from "../utils/payment";

const Buynow = () => {
  const { pid } = useParams();
  const navigate = useNavigate();
  const RAZORPAY_KEY_ID = "rzp_live_qAVbX1D0dGBDYZ"; // Razorpay key
  const { webuser, dispatch } = useContext(userInformation);
  const [data, setData] = useState({
    name: "",
    mob_no: "",
    address: "",
    email: "",
    city: "",
    state: "",
    pincode: "",
    amount: "",
  });
  const [productWithQty, setProductWithQty] = useState(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const product = useFetch(`/product/getProductById/${pid}`);

  useEffect(() => {
    if (product.data) {
      setProductWithQty({
        ...product.data,
        quantity: 1,
        price: product.data.selling_price,
      });
    }
  }, [product.data]);

  useEffect(() => {
    if (webuser) {
      setData({
        name: webuser?.name || "",
        mob_no: webuser?.mob_no || "",
        address: webuser?.address || "",
        email: webuser?.email || "",
        city: webuser?.city || "",
        state: webuser?.state || "",
        pincode: webuser?.pincode || "",
      });
    }
  }, []);

  const increaseCount = async (prodId) => {
    try {
      if (productWithQty._id === prodId) {
        const newQty = productWithQty.quantity + 1;
        const updatedProduct = {
          ...productWithQty,
          quantity: newQty,
          price: newQty * productWithQty.selling_price,
        };

        setProductWithQty(updatedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseCount = async (prodId) => {
    try {
      if (productWithQty._id === prodId) {
        const newQty = productWithQty.quantity - 1;
        const updatedProduct = {
          ...productWithQty,
          quantity: newQty,
          price: newQty * productWithQty.selling_price,
        };

        setProductWithQty(updatedProduct);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentMethod = async() => {
    try {
      // const res= await axios.get('/auth/verifyToken', { withCredentials: true })
      // console.log('tokenres::',res);
      
      if (
        !data.name?.trim() ||
        !data.email?.trim() ||
        !data.mob_no ||
        !data.address?.trim() ||
        !data.pincode?.trim() ||
        !data?.city?.trim() ||
        !data?.state?.trim()
      ) {
        alert(
          "Please fill in all required shipping details before proceeding."
        );
        return;
      } else {
        data.amount = productWithQty.price;
        setPaymentModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRazorpayPayment = async () => {
    try {
      startRazorpayPayment({       
        amount: productWithQty.price,
        data:data,
        product:productWithQty,
        keyId: RAZORPAY_KEY_ID,
        webuser:webuser,
        onSuccess: (savedOrder) => {
          alert("Order placed successfully!");

          savedOrder.products.map(async (cart, index) => {
            const res = await axios.get(
              `/product/getProductById/${cart.product}`
            );
            const qty = res.data.avail_qty - cart.quantity;
            if (res.data) {
              const result = await axios.patch(
                `/product/updateProduct/${cart.product}`,
                { avail_qty: qty }
              );
              // console.log('**********qty');
            }
          });

          navigate('/home')
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
        data:data,
        product:productWithQty,
        webuser:webuser,
        onSuccess: (savedOrder) => {
          alert("Order placed successfully!");

           // Quantity logic here
          savedOrder.products.map(async (cart, index) => {
            const res = await axios.get(
              `/product/getProductById/${cart.product}`
            );
            const qty = res.data.avail_qty - cart.quantity;
            if (res.data) {
              const result = await axios.patch(
                `/product/updateProduct/${cart.product}`,
                { avail_qty: qty }
              );
              // console.log('**********qty');
            }
          });


          navigate('/home')
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
      <Box
        sx={{
          marginLeft: { xs: 0, sm: 4, lg: 14 },
          marginTop: { xs: 2, sm: 0, lg: 5 },
          alignContent: "center",
        }}
      >
        <Card
          sx={{
            width: "80%",
            borderRadius: 5,
            boxShadow: 6,
            alignContent: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight={600}
              color="#177bad"
              sx={{ marginTop: 2 }}
            >
              Shipping Address:
            </Typography>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={2}
              className="stack-style"
            >
              <Stack
                item
                direction={"column"}
                spacing={2}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <TextField
                  label="User Name"
                  name={"name"}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="Email Address"
                  name={"email"}
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="Mobile Number"
                  name={"mob_no"}
                  value={data.mob_no}
                  onChange={(e) => setData({ ...data, mob_no: e.target.value })}
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="Address"
                  name={"address"}
                  value={data.address}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="City"
                  name={"city"}
                  value={data.city}
                  onChange={(e) => setData({ ...data, city: e.target.value })}
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="State"
                  name={"state"}
                  value={data.state}
                  onChange={(e) => setData({ ...data, state: e.target.value })}
                  sx={{ width: 300 }}
                  size="small"
                />
                <TextField
                  label="Pin Code"
                  name={"pincode"}
                  value={data.pincode}
                  onChange={(e) =>
                    setData({ ...data, pincode: e.target.value })
                  }
                  sx={{ width: 300 }}
                  size="small"
                />

                {/* <Button variant='contained' sx={{ backgroundColor: '#c26afc', color: 'white' }} type='submit'>Register</Button> */}
              </Stack>
              <Stack
                item
                direction={"column"}
                spacing={4}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <table
                    style={{ marginTop: "2%", width: "80%" }}
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
                      <tr>
                        {/* {cart._id} */}
                        <th>
                          <img
                            src={
                              axios.defaults.baseURL + productWithQty?.thumbnail
                            }
                            style={{ height: "2%", width: "50%" }}
                          />
                        </th>

                        <th style={{ width: "30%" }}>
                          {productWithQty?.title}
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
                              onClick={() => increaseCount(productWithQty._id)}
                              size="small"
                            >
                              <AddCircleOutlineIcon />
                            </Button>
                            <label>{productWithQty?.quantity}</label>
                            <Button
                              onClick={() => decreaseCount(productWithQty._id)}
                              size="small"
                            >
                              <RemoveCircleOutlineRoundedIcon />
                            </Button>
                          </Box>
                        </th>
                        <th>{productWithQty?.price}</th>
                      </tr>

                      {/* <tr>
                <th></th>
                <th style={{float:'right'}}>Total:</th>
                <th>RS. {total}  </th>
                </tr> */}
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
                </div>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <NewFooter />

      <Modal open={paymentModalOpen}>
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
            <Button onClick={() => setPaymentModalOpen(false)}>
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
                setPaymentModalOpen(false);
                handleRazorpayPayment(); // Razorpay
              }}
            >
              Pay Online (Razorpay)
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setPaymentModalOpen(false);
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

export default Buynow;
