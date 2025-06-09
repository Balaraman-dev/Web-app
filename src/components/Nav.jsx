import React from 'react'
import { useNavigate } from 'react-router-dom';
const Nav = () => {
    const navigate=useNavigate();

  return (
    <div className='w-full  flex items-center justify-center'>
      <div className='w-11/12 flex justify-between h-16 mt-12 items-center rounded-full bg-black text-white '>
          <h2 className='font-bold text-2xl pl-20 text-blue-'>ShopSphere</h2>
          <div className='flex gap-15 pr-20'>
              <h3 className='font-semibold text-xl cursor-pointer hover:text-amber-400 duration-300' onClick={()=>navigate("/")}>Home</h3>
              <h3 className='font-semibold text-xl cursor-pointer hover:text-amber-400 duration-300' onClick={()=>navigate("/products")}>Products</h3>
              <h3 className='font-semibold text-xl cursor-pointer hover:text-amber-400 duration-300' onClick={()=>navigate("/cart")}>Cart</h3>
              <h3 className='font-semibold text-xl cursor-pointer hover:text-amber-400 duration-300' onClick={()=>navigate("/profile")}>Profile</h3>
          </div>
      </div>
    </div>
  )
}

export default Nav
