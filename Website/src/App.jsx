
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import Product from './component/Product'
import ProductDetail from './component/ProductDetail'
import Category from './component/Category'
import SearchProduct from './component/SearchProduct'
import { AuthContextProvider } from './context/AuthContext'
import Cart from './component/Cart'
import Login from './component/Login'
import SignOut from './component/SignOut'
import Home from './component/Home'
import { CartProvider } from './context/CartContext'
import Signup from './component/Signup'
import NewSignUp from './component/NewSignUp'
import Buynow from './component/Buynow'
import ContactUs from './component/ContactUs'
import Profile from './component/Profile'

function App() {


  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/' element={<NewHome />} /> */}
             {/* <Route path='/home' element={<NewHome />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/signOut' element={<SignOut />} />
            <Route path='/product' element={<Product />} />
            <Route path='/prodDetail/:pid' element={<ProductDetail />} />
            <Route path='/category/:name' element={<Category />} />
            <Route path='/searchProduct/:name' element={<SearchProduct />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/signup' element={<NewSignUp />} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/buynow/:pid' element={<Buynow />} />
            <Route path='/contactus' element={<ContactUs />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </AuthContextProvider>


    </>
  )
}

export default App
