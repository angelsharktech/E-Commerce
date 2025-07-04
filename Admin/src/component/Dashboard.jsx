import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  Modal,
  Grid,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Product from "./Product";
import Category from "./Category";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { useNavigate } from "react-router-dom";
import { userInformation } from "../context/AuthContext";
import Home from "./Home";
import Profile from "./Profile";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ProductList from "./ProductList";
import NewCategory from "./NewCategory";
import CategoryList from "./CategoryList";
import Order from "./Order";
import ReorderOutlinedIcon from "@mui/icons-material/ReorderOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import axios from "axios";

const menuItems = [
  {
    label: "Product List",
    value: "ProductList",
    icon: <ListAltOutlinedIcon />,
  },
  {
    label: "Upload Product",
    value: "Product",
    icon: <Inventory2OutlinedIcon />,
  },
  { label: "Add Category", value: "Category", icon: <CategoryOutlinedIcon /> },
  // { label: 'Category List', value: 'CategoryList', icon: <ListAltOutlinedIcon /> },
  {
    label: "Profile Manager",
    value: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  { label: "Orders", value: "Orders", icon: <ReorderOutlinedIcon /> },
  { label: "Feedback", value: "Feedback", icon: <FeedbackOutlinedIcon /> },
];

const selected = {
  background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
  color: "white",
  borderRadius: "8px",
  fontWeight: 600,
  boxShadow: 2,
};

const unSelected = {
  color: "#c26afc",
  borderRadius: "8px",
  fontWeight: 500,
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "#f3e7e9",
  },
};

const Dashboard = () => {
  const { user, dispatch } = useContext(userInformation);
  const [comp, setComp] = useState("Home");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/order/getOrderByStatusAndDate`);
        if (!res) {
          throw new Error("Network response was not ok");
        }
        if (res.data > 0) {
          setData(res.data);
          setOpen(true);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();

     const interval = setInterval(() => {
    fetchOrders();
  }, 360000);

  // Cleanup
  return () => clearInterval(interval);
  }, []);

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <>
      <Box>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              sx={{ color: "whitesmoke", flexGrow: 1, fontWeight: 700 }}
            >
              {user?.shop_name} Dashboard-Admin
            </Typography>
            <Button
              variant="outlined"
              style={{ color: "white", borderColor: "white" }}
              onClick={() => setComp("Home")}
            >
              Home
            </Button>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white", ml: 2 }}
              onClick={logOut}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Grid
          container
          sx={{ minHeight: "calc(100vh - 100px)", overflow: "hidden" }}
        >
          {/* Sidebar */}
          <Grid item xs={12} sm={3} md={2} sx={{ minWidth: 220 }}>
            <Card
              sx={{
                m: 3, // Only vertical margin
                borderRadius: 4,
                boxShadow: 6,
                background: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                p: 2,
                height: "calc(100vh - 160px)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#c26afc",
                  fontWeight: 700,
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Menu
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {menuItems.map((item) => (
                  <ListItemButton
                    key={item.value}
                    selected={comp === item.value}
                    onClick={() => setComp(item.value)}
                    sx={comp === item.value ? selected : unSelected}
                  >
                    <ListItemIcon
                      sx={{ color: comp === item.value ? "white" : "#c26afc" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItemButton>
                ))}
              </List>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} sm={9} md={10} sx={{ py: 3, pr: 3, pl: 0 }}>
            <Box sx={{ minHeight: "80vh", width: "100%" }}>
              {
                {
                  Home: <Home />,
                  Product: <Product />,
                  ProductList: <ProductList />,
                  // Category: <NewCategory />,
                  // CategoryList: <CategoryList />,
                  Category: <Category />,
                  Orders: <Order />,
                  About: <AboutUs />,
                  Contact: <ContactUs />,
                  Profile: <Profile />,
                }[comp]
              }
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Modal
        open={open}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            background: "white",
            borderRadius: 4,
            boxShadow: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          <h3>You have {data} new orders in processing</h3>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #c26afc 0%, #177bad 100%)",
              color: "whitesmoke",
            }}
            onClick={() => setOpen(false)}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
