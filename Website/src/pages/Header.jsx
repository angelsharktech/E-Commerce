import { AppBar, Button, Drawer, InputAdornment, TextField } from '@mui/material'
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
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const { webuser } = useContext(userInformation)
  const [menu, setMenu] = useState({ right: false });
  const [query, setQuery] = useState('')
  const category = useFetch('/category/getCategory')
  const prod = useFetch('/product/getProduct')

  const navigate = useNavigate()
  const {cartCount ,setCartCount} = useCart()

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
      console.log('search::', e.target.value);
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
      style={{ width: 250, padding: 20, marginTop: '70px' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <Link className='menu-link' to={'/home'}>
        <HomeIcon /> Home
      </Link>
      <Link className='menu-link' to={'/product'}>
        <AppsIcon /> Product
      </Link>
      <Link className='menu-link' to={'/'}>
        <CategoryIcon /> Category
      </Link>
      <Link className='menu-link' to={'/'}>
        <InfoOutlineIcon /> About Us
      </Link>
      <Link className='menu-link' to={'/'}>
        <PhoneIcon />  Contact Us
      </Link>
      <Link className='menu-link' to={'/'}>
        <ShoppingCartIcon /> Cart
      </Link>
      <Link className='menu-link' to={'/login'}>
        <LoginIcon /> Login
      </Link>
      <Link className='menu-link' to={'/'}>
        <AddToHomeScreenIcon />  Sign Up
      </Link>
      {/* <p>Menu Item 3</p> */}
    </div>

  );

  return (
    <>
      <div className='container'>
        {/* <div className="header-wrapper" style={{ position: 'fixed', top: 0, zIndex: 1200 }}> */}
        <AppBar style={{ height: '60px', backgroundColor: '#c26afc' }}>

          <h3 style={{ marginTop: '12px', marginLeft: "50px" }}>Website</h3>

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

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'right',
            marginRight: '10%', marginTop: '-4%',
            gap: '20px', alignItems: 'center'
          }}>
            {webuser ? (
              <>
              <Link className='header' to={'/cart'}><AddShoppingCartRoundedIcon /> cart <sup>{cartCount}</sup></Link>
                <li className="header dropdown">
                  {/* <Link className='header' >{webuser.name}</Link> */}
                  <h6 className="header"><AccountCircleIcon/>{webuser.name}</h6>
                  <ul className="dropdown-menu">
                    <li><Link to={`/`}><PermIdentityIcon/>Profile</Link></li>
                    <li><Link to={`/signOut`} ><ExitToAppIcon/>SignOut</Link></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
               <Link className='header' to={'/'}><AddShoppingCartRoundedIcon />cart</Link>
                <Link className='header' to={'/login'}>Login</Link>
                <Link className='header' to={'/'}>SignUp</Link>
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

                <li><Link to={`/category/${category.categoryName}`}>{category.categoryName}</Link></li>
              ))}
              {/* <li><Link to="/health-checkup">Cycle</Link></li>
              <li><Link to="/health-checkup">Game</Link></li> */}
            </ul>
          </li>
          <Link className='header-base' to={'/'}>About Us</Link>
          <Link className='header-base' to={'/'}>Contact Us</Link>
          <div>
            <div className="input-group">
              <div className="form-outline" data-mdb-input-init>
                <input type="search" className="form-control" placeholder='Search' onChange={handleChange} />
                {/* <label className="form-label" for="form1"></label> */}
              </div>
              <Button type="button" style={{ backgroundColor: '#c26afc' }} onClick={() => searchProduct()}>
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