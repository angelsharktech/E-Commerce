
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './pages/Header'
import Home from './component/Home'
import Product from './component/Product'
import ProductDetail from './component/ProductDetail'
import Category from './component/Category'
import SearchProduct from './component/SearchProduct'
import { AuthContextProvider } from './context/AuthContext'

function App() {


  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product' element={<Product />} />
            <Route path='/prodDetail/:id' element={<ProductDetail />} />
            <Route path='/category/:name' element={<Category />} />
            <Route path='/searchProduct/:name' element={<SearchProduct />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>


    </>
  )
}

export default App
