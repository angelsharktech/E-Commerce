import { AppBar, Button, Drawer, InputAdornment, TextField, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import './Header.css';
import { MenuOpen } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import LoginIcon from '@mui/icons-material/Login';
import AppsIcon from '@mui/icons-material/Apps';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import useFetch from '../hooks/useFetch';
import axios from 'axios'
import { userInformation } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
// import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Header = () => {
  const { webuser } = useContext(userInformation)
  const [menu, setMenu] = useState({ right: false });
  const [query, setQuery] = useState('')
  const category = useFetch('/category/getCategory')
  const prod = useFetch('/product/getProduct')
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
console.log('web::', webuser);
  const navigate = useNavigate()
  const { cartCount, setCartCount } = useCart()

  useEffect(() => {
    const fetchCount = async () => {
      if (webuser?._id) {
        const res = await axios.get(`cart/getCartItemCount/${webuser._id}`);
        setCartCount(res.data.count);
      }
    };
    fetchCount();
  }, [webuser?._id]);

  const handleChange = (e) => {
    try {
      
      setQuery(e.target.value)
    } catch (error) {
      console.log(error);

    }
  }
  const searchProduct = async () => {
    try {

      navigate(`/searchProduct/${query}`)

    } catch (error) {

    }
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMenu({ ...menu, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{ width: 250, marginTop: '70px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/home">
            <ListItemIcon><HomeIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
            <ListItemText className='menu-link' primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/product">
            <ListItemIcon><AppsIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
            <ListItemText className='menu-link' primary="Product" />
          </ListItemButton>
        </ListItem>

        {/* Category Dropdown */}
        <ListItemButton onClick={() => setOpenCategoryDropdown(true)}>
          <ListItemIcon ><CategoryIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
          <ListItemText className='menu-link' primary="Category" />
          {/* {openCategoryDropdown ? <ExpandLess /> : <ExpandMore />} */}
        </ListItemButton>
        <Collapse in={openCategoryDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.data?.map((cat) => (
              <ListItemButton
                key={cat._id}
                sx={{ pl: 4 }}
                component={Link}
                to={`/category/${cat.categoryName}`}
              >
                <ListItemText className='menu-link' primary={cat.categoryName} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon><InfoOutlineIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
            <ListItemText className='menu-link' primary="About Us" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contactus">
            <ListItemIcon><PhoneIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
            <ListItemText className='menu-link' primary="Contact Us" />
          </ListItemButton>
        </ListItem>

        {/* Auth Section */}
        {webuser ? (
          <>
            <ListItemButton component={Link} to="/cart">
              <ListItemIcon><ShoppingBagOutlinedIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
              <ListItemText className='menu-link' primary={`Cart (${cartCount})`} />
            </ListItemButton>

            <ListItemButton onClick={() => setOpenUserDropdown(true)}>
              <ListItemIcon><AccountCircleIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
              <ListItemText className='menu-link' primary={webuser.mob_no} />
              {openUserDropdown ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserDropdown} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/profile">
                  <ListItemIcon><PermIdentityIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
                  <ListItemText className='menu-link' primary="Profile" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/signOut">
                  <ListItemIcon><ExitToAppIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
                  <ListItemText className='menu-link' primary="Sign Out" />
                </ListItemButton>
              </List>
            </Collapse>
          </>
        ) : (
          <>
            <ListItemButton component={Link} to="/cart">
              <ListItemIcon><ShoppingBagOutlinedIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
              <ListItemText className='menu-link' primary="Cart" />
            </ListItemButton>
            {/* <ListItemButton component={Link} to="/login">
          <ListItemIcon><LoginIcon  sx={{color:'#fc94af'}}/></ListItemIcon>
            <ListItemText  className='menu-link' primary="Login" />
          </ListItemButton> */}
            <ListItemButton component={Link} to="/signup">
              <ListItemIcon><PersonAddAltIcon sx={{ color: '#fc94af' }} /></ListItemIcon>
              <ListItemText className='menu-link' primary="Sign Up" />
            </ListItemButton>
          </>
        )}
      </List>
    </div>


  );

  return (
    <>
      <div className='container'>
        {/* <div className="header-wrapper" style={{ position: 'fixed', top: 0, zIndex: 1200 }}> */}
        <AppBar style={{ height: '60px' }}>
          <h3 style={{ marginTop: '12px', marginLeft: "50px" }}>
            Radhakrishn Toy Shop
          </h3>

          <div className='menu-button'>

            <React.Fragment key={'right'}>
              <Button onClick={toggleDrawer('right', true)}>
                <MenuOpen sx={{ color: '#808080', fontSize: 50 }} />
              </Button>
              <Drawer
                anchor="right"
                open={menu['right']}
                onClose={toggleDrawer('right', false)}
                sx={{ float: 'right' }}
              >
                {list('right')}
              </Drawer>
            </React.Fragment>

          </div>

          <div className="header-actions">
            {webuser ? (
              <>
                <Link className='header' to={'/cart'}><ShoppingBagOutlinedIcon /> Bag <sup>{cartCount}</sup></Link>
                <li className="header dropdown">
                  {/* <Link className='header' >{webuser.name}</Link> */}
                  <h6 className="header"><AccountCircleIcon />{webuser?.mob_no}</h6>
                  <ul className="dropdown-menu">
                    <li><Link to={`/profile`}><PermIdentityIcon />Profile</Link></li>
                    <li><Link to={`/signOut`} ><ExitToAppIcon />SignOut</Link></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <Link className='header' to={'/'}><ShoppingBagOutlinedIcon />Bag</Link>
                {/* <Link className='header' to={'/login'}>Login</Link> */}
                <Link className='header' to={'/signup'}>SignUp</Link>
              </>
            )}

          </div>
        </AppBar>

        <div className='menu-button' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '7%' }}>

          <Link className='header-base' to={'/'}>Home</Link>
          <Link className='header-base' to={'/product'}>Products</Link>
          {/* <Link className='header-base' to={'/category'}>Category</Link> */}
          <li className="header-base dropdown">
            <h5 className="header-base">Category</h5>
            <ul className="dropdown-menu">
              {category.data?.map((category) => (

                <li key={category.categoryName}><Link to={`/category/${category.categoryName}`}>{category.categoryName}</Link></li>
              ))}
            </ul>
          </li>
          <Link className='header-base' to={'/'}>About Us</Link>
          <Link className='header-base' to={'/contactus'}>Contact Us</Link>
          <div className='search-style' >
            <div className="input-group">
              <div className="form-outline" data-mdb-input-init>
                <input type="search" className="form-control" placeholder='Search' onChange={handleChange} />
                {/* <label className="form-label" for="form1"></label> */}
              </div>
              <Button type="button" style={{ backgroundColor: '#fc94af',marginLeft:'5px' }} onClick={() => searchProduct()}>
                <SearchIcon style={{ color: 'white' }}></SearchIcon>
              </Button>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </>
  )
}

export default Header