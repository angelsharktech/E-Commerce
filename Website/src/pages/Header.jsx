import {
  AppBar,
  Button,
  Drawer,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { MenuOpen, MoreVert } from "@mui/icons-material";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import LoginIcon from "@mui/icons-material/Login";
import AppsIcon from "@mui/icons-material/Apps";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { userInformation } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchBar from "../component/SearchBar";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const { webuser } = useContext(userInformation);
  const [menu, setMenu] = useState({ left: false });
  const category = useFetch("/category/getCategory");
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const { cartCount, setCartCount } = useCart();

  useEffect(() => {
    const fetchCount = async () => {
      if (webuser?._id) {
        const res = await axios.get(`cart/getCartItemCount/${webuser._id}`);
        setCartCount(res.data.count);
      }
    };
    fetchCount();
  }, [webuser?._id]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenu({ ...menu, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ width: 250, marginTop: "100px" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/home">
            <ListItemIcon>
              <HomeIcon sx={{ color: "#471396" }} />
            </ListItemIcon>
            <ListItemText className="menu-link" primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product">
            <ListItemIcon>
              <AppsIcon sx={{ color: "#471396" }} />
            </ListItemIcon>
            <ListItemText className="menu-link" primary="Product" />
          </ListItemButton>
        </ListItem>

        {/* Category Dropdown */}
        {/* <ListItemButton onClick={() => setOpenCategoryDropdown(true)}>
          <ListItemIcon>
            <CategoryIcon sx={{ color: "#471396" }} />
          </ListItemIcon>
          <ListItemText className="menu-link" primary="Category" />
          {openCategoryDropdown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openCategoryDropdown} timeout="auto">
          <List component="div" disablePadding>
            {category.data?.map((cat) => (
              <ListItemButton
                key={cat._id}
                sx={{ pl: 4 }}
                component={Link}
                to={`/category/${cat.categoryName}`}
              >
                <ListItemText
                  className="menu-link"
                  primary={cat.categoryName}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse> */}

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <InfoOutlineIcon sx={{ color: "#471396" }} />
            </ListItemIcon>
            <ListItemText className="menu-link" primary="About Us" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contactus">
            <ListItemIcon>
              <PhoneIcon sx={{ color: "#471396" }} />
            </ListItemIcon>
            <ListItemText className="menu-link" primary="Contact Us" />
          </ListItemButton>
        </ListItem>

        {/* Auth Section */}
        {webuser ? (
          <>
            <ListItemButton component={Link} to="/orders">
              <ListItemIcon>
                <LoginIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText className="menu-link" primary="Orders" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cart">
              <ListItemIcon>
                <ShoppingBagOutlinedIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText
                className="menu-link"
                primary={`Cart (${cartCount})`}
              />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenUserDropdown(true)}>
              <ListItemIcon>
                <AccountCircleIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText className="menu-link" primary={webuser.mob_no} />
              {openUserDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/profile">
                  <ListItemIcon>
                    <PermIdentityIcon sx={{ color: "#471396" }} />
                  </ListItemIcon>
                  <ListItemText className="menu-link" primary="Profile" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/signOut">
                  <ListItemIcon>
                    <ExitToAppIcon sx={{ color: "#471396" }} />
                  </ListItemIcon>
                  <ListItemText className="menu-link" primary="Sign Out" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ) : (
          <>
            <ListItemButton component={Link} to="/cart">
              <ListItemIcon>
                <ShoppingBagOutlinedIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText className="menu-link" primary="Cart" />
            </ListItemButton>
            <ListItemButton component={Link} to="/signup">
              <ListItemIcon>
                <LoginIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText className="menu-link" primary="Orders" />
            </ListItemButton>
            <ListItemButton component={Link} to="/signup">
              <ListItemIcon>
                <PersonAddAltIcon sx={{ color: "#471396" }} />
              </ListItemIcon>
              <ListItemText className="menu-link" primary="Sign Up" />
            </ListItemButton>
          </>
        )}
      </List>
    </div>
  );

  return (
    <>
      <div className="container">
        <div style={{ height: "30px", position: "fixed", zIndex: 1300 }}>
          <AppBar >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                // padding: "0 2vw",
                height: "70px", // must match AppBar height
              }}
            >
              <Link to={"/home"}  className="heading">Starbasket</Link>

              {/* </div> */}
              <div className="search-style">
                <div>
                  <SearchBar />
                </div>
              </div>

              <div className="menu-button">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // space between menu+logo and other elements (e.g. cart, login)
                    left: 0,
                  }}
                >
                  <React.Fragment key={"left"}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: -1 }}>
                      <Button onClick={toggleDrawer("left", true)}>
                        <MenuIcon sx={{ color: "#ccc", fontSize: 32 }} />
                      </Button>

                      <Typography
                        variant="h6"
                        fontWeight="bold"
                         color= "#fff"
                      >
                        <Link to={"/home"} style={{ color: "#fff", textDecoration: "none" }}>
                          Starbasket
                        </Link>
                      </Typography>
                    </Box>

                    <Drawer
                      anchor="left"
                      open={menu["left"]}
                      onClose={toggleDrawer("left", false)}
                    >
                      {list("left")}
                    </Drawer>
                  </React.Fragment>
                </Box>
              </div>


              <Box className="header-actions">
                {webuser ? (
                  <>
                    <Link className="header-order" to={"/orders"}>
                      <ShoppingBagOutlinedIcon /> Orders
                    </Link>
                    <Link className="header" to={"/cart"}>
                      <ShoppingBagOutlinedIcon /> cart <sup>{cartCount}</sup>
                    </Link>
                    <li className="header dropdown">
                      {/* <Link className='header' >{webuser.name}</Link> */}
                      <h6 className="header">
                        <AccountCircleIcon />
                        {/* {webuser?.mob_no} */}
                      </h6>
                      <ul className="dropdown-menu">
                        <li>
                          <Link to={`/profile`}>
                            <PermIdentityIcon />
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={`/signOut`}>
                            <ExitToAppIcon />
                            SignOut
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <Link className="header-order" to={"/signup"}>
                      Orders
                    </Link>
                    <Link className="header" to={"/signup"}>
                      <ShoppingBagOutlinedIcon />
                      Cart
                    </Link>
                    {/* <Link className='header' to={'/login'}>Login</Link> */}
                    <Link className="header" to={"/signup"}>
                      <ExitToAppOutlinedIcon />
                      SignUp
                    </Link>
                  </>
                )}
              </Box>
            </Box>
            <div className="searchbar-mobile">
            <SearchBar />
          </div>
           
          </AppBar>
        </div>
       

        <div className="sticky-menu menu-button ">
          <Box className="sticky-menu-box">
            <Link className="header-base" to={"/"}>
              Home
            </Link>
            <Link className="header-base" to={"/product"}>
              Products
            </Link>
            {/* <Link className='header-base' to={'/category'}>Category</Link> */}
            <li className="header-base dropdown">
              <h5 className="header-base">Category</h5>
              <ul className="dropdown-menu">
                {category.data?.map((category) => (
                  // <li key={category.mainCategory}>
                  //   <Link to={`/category/${category.mainCategory}`}>
                  //     {category.mainCategory}
                  //   </Link>
                  // </li>
                  <li key={category.categoryName}>
                    <Link to={`/category/${category.categoryName}`}>
                      {category.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <Link className="header-base" to={"/"}>
              About Us
            </Link>
            <Link className="header-base" to={"/contactus"}>
              Contact Us
            </Link>
            {/* <div className="search-style">
              <div className="input-group">
                <SearchBar />
              </div>
            </div> */}
          </Box>
        </div>

        {/* </Box> */}
      
      </div>
      
      
    </>
  );
};

export default Header;
