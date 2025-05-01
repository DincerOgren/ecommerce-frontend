import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaBeer } from 'react-icons/fa'
import Products from './Components/products/Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/home/Home'
import Navbar from './Components/shared/Navbar'

function App() {

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
  )
}

export default App
