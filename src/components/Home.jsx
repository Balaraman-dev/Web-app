import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate=useNavigate();
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='w-3/4  flex justify-between mt-12'>
        </div>  
      <div className='w-full flex gap-6 px-12'>
            <img className='w-1/2 max-h-[600px]' src={"https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/2.webp"} alt="img" />
            <p className='text-2xl mt-42 font-mono animate-color-cycle'>Welcome to Shopping Kart, a sleek, fast, and fully functional e-commerce web application built using React.js and powered by the FakeStoreAPI. Designed with a modern user interface and smart user experience, Shopping Kart simulates a real-world online shopping platform — where users can explore products, view detailed information, and manage their cart seamlessly.</p>

      </div>
    </div>
  )
}

export default Home
