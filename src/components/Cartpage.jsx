import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);

  const getCurrentUserId = () => {
    const user = localStorage.getItem("user");
    try {
      return JSON.parse(user).id;
    } catch {
      return null;
    }
  };

  const formatPrice = (price) => {
    return `₹ ${Number((price * 85.8).toFixed(0)).toLocaleString('en-IN')}`;
  };

  useEffect(() => {
    const fetchCart = async () => {
      const user_id = getCurrentUserId();
      if (!user_id) return alert("Please login to view cart.");

      try {
        const res = await axios.post('http://localhost/backend/GetCart.php', { user_id });
        if (res.data.status === 'success') {
          setCartItems(res.data.cart || []);
        } else {
          alert("Failed to load cart");
        }
      } catch (e) {
        console.error("Error fetching cart:", e);
        alert("Error loading cart");
      }
    };

    fetchCart();
  }, []);

  if (!cartItems.length) {
    return <div className='text-center text-2xl mt-16'>Your cart is empty.</div>;
  }

  return (
    <>
    <h3 className='mt-12 ml-16 text-3xl font-bold text-blue-900'>Cart :</h3>
    <div className='py-6 pl-16 grid grid-cols-3 gap-8'>
      {cartItems.map((val) => (
        <div key={val.id} className='bg-white rounded-lg border-2 border-gray-300 flex p-4'>
          <img className='w-35 max-h-[300px]' src={val.image} alt={val.title} />
          <div className='p-4 flex-1'>
            <h3 className='font-bold text-lg text-blue-900 line-clamp-1'>{val.title}</h3>
            <p className='text-gray-600 text-sm line-clamp-2'>{val.description}</p>
            <h3 className='font-bold text-amber-700 text-xl mt-2'>{formatPrice(val.price)}</h3>
            <div className='mt-4 flex gap-4'>
              <button className='px-4 py-2 bg-black border-2 border-black font-semibold hover:text-black text-white rounded-full hover:bg-white'>Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default Cartpage;
