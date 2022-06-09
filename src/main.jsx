import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import Header from "./components/header/header"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Header/>
    <App />
  </React.StrictMode>
)
