import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaBeer } from 'react-icons/fa'
import Products from './Components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home'
import Navbar from './Components/shared/Navbar'
import About from './Components/About'
import Contact from './Components/Contact'
import { Toaster } from 'react-hot-toast'
import Cart from './Components/cart/Cart'
import Login from './Components/auth/Login'

function App() {

  return (
    <React.Fragment>

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
      <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
