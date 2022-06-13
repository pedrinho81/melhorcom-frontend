import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import Header from "./components/header"
import Footer from "./components/footer"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Header/>
    <App />
    <Footer/>
  </React.StrictMode>
)
