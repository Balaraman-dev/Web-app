import React from 'react'
import { useState } from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Products from './components/Products.jsx'
import Nav from './components/Nav.jsx'

import Register from './components/Register.jsx'
import Home from './components/Home.jsx'
import Profile from './components/Profile.jsx'
import Cart from './components/Cartpage.jsx'
import Login from './components/Login.jsx'


const Main_component = () => {
  
  const [cart,setCart]=useState();

  return (
    <div className="w-full font-sans">

    <BrowserRouter >
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={ <Register/>}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>

        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default Main_component
