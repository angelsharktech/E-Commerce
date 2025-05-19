import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = 'http://69.62.81.214:3000/api';
// axios.defaults.baseURL = 'http://localhost:3000/api';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
    
  // </StrictMode>,
)
