import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.starbasket.in/api';
// axios.defaults.baseURL = 'https://api.toyshop.sbs/api';


window.history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
    
  // </StrictMode>,
)
