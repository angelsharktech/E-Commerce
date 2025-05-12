import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './component/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './component/Dashboard'
import Product from './component/Product'
import Register from './component/Register'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            {/* <Route path='/product' element={<Product />} /> */}
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    </>
  )
}

export default App
