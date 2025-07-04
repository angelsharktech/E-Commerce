import React, { useContext, useEffect, useState } from "react";
import Header from "../pages/Header";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Box,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { userInformation } from "../context/AuthContext";
import { Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import NewFooter from "../pages/NewFooter";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductDetail = () => {
  const { webuser } = useContext(userInformation);
  const navigate = useNavigate();
  const { pid } = useParams();
  const { setCartCount } = useCart();

 const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
    try {
      const res = await axios.get(`/product/getProductById/${pid}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  fetchProduct();
 }, [pid])

 
  const isVisible = product?.avail_qty < 1 ? true : false;

  const addToCart = async (data) => {
    try {
      if (webuser) {

        const result = await axios.post(`/cart/addToCart/${webuser._id}`, data);
        //  navigate(`/cart/`, { state: { prod: data } })
        const res = await axios.get(`/cart/getCartItemCount/${webuser._id}`);

        setCartCount(res.data.count);
      } else {
        // setOpen(true)
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buyNow = async (prdodData) => {
    try {
      if (webuser) {
        navigate(`/buynow/${prdodData._id}`);
      } else {
        // setOpen(true)
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let images = product?.images || [];
  if (product?.thumbnail && !images.includes(product.thumbnail)) {
    images = [product.thumbnail, ...images];
  }

  const items = images.map((item, index) => {
    const isVideo = item.endsWith(".mp4");
    
    return isVideo ? (
      <video
        controls
        className="carousel-media"
      >
        <source src={axios.defaults.baseURL + item} type="video/mp4" />
      </video>
    ) : (
      <Zoom key={index}>
        <img
          className="carousel-media"
          src={axios.defaults.baseURL + item}
        />
      </Zoom>
    );
  });
   const productDetail = {
    Name: product?.title,
    Price: product?.selling_price,
    Age: product?.age_group,
    Brand: product?.brand,
    No_of_Pieces: product?.no_of_pieces,
    Assembly_Request: product?.assembly_req,
    Scale: product?.scale,
    Battery_Required: product?.battery_req,
    Battery_Included: product?.battery_incl,
    Material_Type: product?.material_type,
    Remote_Control: product?.remote_control,
    Colour: product?.colour,
    Product_Dimensions: product?.prod_dimensions,
    Manufacturer_Recommend_Age: product?.manufacturer_recommend_age,
    Manufacturer: product?.manufacturer_name,
    item_weight: product?.item_weight,
    Net_Quantity: product?.net_qty,
    Packer: product?.packer,
  };
  return (
    <>
      <Header />
      <div className="product-detail-bg">
        <div className="product-detail-flex">
          <div className="product-card">
            <AliceCarousel
              // autoHeight
              // infinite
              // mouseTracking
              items={items}
              disableButtonsControls={true}
            />
          </div>
          {product && (
            <div className="product-info">
              <div className="product-title">{product.title}</div>
              <div className="product-desc">{product.description}</div>
              {/* <div className="product-price">{product.selling_price} Rs.</div> */}
              <p>
                <span className="price-label">
                  {product.actual_price} RS.
                </span>
                <span
                  style={{
                    color: "#43a047",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                  }}
                >
                  {product.selling_price} RS.
                </span>
                {product.discount > 0 && (
                  <span className="discount">{product.discount}% OFF</span>
                )}
                <br />
                {product.avail_qty < 1 ? (
                  <>
                    <span style={{ color: "red" }}>Out Of Stock</span>
                  </>
                ) : (
                  <>
                    <span style={{ color: "red" }}>
                      {product.avail_qty} items left
                    </span>
                  </>
                )}
              </p>
              <div className="product-actions">
                <Button
                  variant="contained"
                  className="product-btn"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBagOutlinedIcon style={{ marginRight: "8px" }} />
                  Add To Cart
                </Button>
               
                {isVisible ? (<>
                <Button
                  variant="contained"
                  className="product-btn-outoffStock"
                  onClick={() => buyNow(product)}
                  disabled
                >
                  <BoltOutlinedIcon style={{ marginRight: "8px" }} />
                  Buy Now
                </Button>
                </>) : (<>
                 <Button
                  variant="contained"
                  className="product-btn"
                  onClick={() => buyNow(product)}
                >
                  <BoltOutlinedIcon style={{ marginRight: "8px" }} />
                  Buy Now
                </Button></>)}
              </div>
            </div>
          )}
        </div>
         <Divider style={{ marginTop: "-8%", marginBottom: "1%" }} />
        <div>
          <h3 style={{ marginLeft: "5%" }}>Product Information </h3>
          {product && (
            <TableContainer
              component={Paper}
              sx={{
                width: {
                  xs: "100%", // Full width on extra-small screens
                  sm: "80%", // 80% width on small screens
                  md: "60%", // 60% on medium screens
                  lg: "50%", // 50% on large and above
                },
                marginLeft: {
                  sm: "5%",
                  lg: "5%",
                },
              }}
            >
              <Table>
                {/* <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong></strong>
                    </TableCell>
                    <TableCell>
                      <strong></strong>
                    </TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {Object.entries(productDetail).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.replace(/_/g, " ")}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
     
      <NewFooter />
    </>
  );
};

export default ProductDetail;
