import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    // Fetch products on load
    useEffect(() => {
        let url = 'http://localhost/backend/Products.php';
        axios.get(url)
            .then(res => {
                const products = res.data.products || res.data || [];
                setData(products);
            })
            .catch(e => {
                console.error("Error fetching products:", e);
                setData([]);
            });
    }, []);

    // Get current user from localStorage
    const getCurrentUserId = () => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                return user.id; // Return user ID
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }
        return null;
    };

    const addToCart = async (product) => {
    const userId = getCurrentUserId();
    if (!userId) return alert("Please log in first");

    console.log("Adding to cart:", product.id, userId);
    try {
        const response = await axios.post('http://localhost/backend/Cart.php', {
            id: product.id,
            user_id: userId     // Send it explicitly
        });
        if (response.data.status === 'success') {
            alert(response.data.message || "Added to cart");
        } else {
            alert(response.data.message || "Failed to add to cart");
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("Failed to add to cart. Please check your connection.");
    }
};

    // Format price
    const formatPrice = (price) => {
        return `₹ ${Number((price * 85.8).toFixed(0)).toLocaleString('en-IN')}`;
    };

    return (
        <div className='w-full flex items-center justify-center flex-col'>
            <h2 className='w-full text-3xl font-semibold pl-12 mt-12'>Products :</h2>
            {!data.length && <h1 className='w-full h-full flex text-center text-3xl mt-16 ml-40 text-red-500'>Loading...</h1>}
            <div className='grid grid-cols-4 gap-12 p-12'>
                {data.map((val) => (
                    <div key={val.id} className=' bg-white rounded-lg border-4  border-gray-200 px-2 py-4  flex flex-col items-center'>
                        <img className='w-full h-48 max-w-1/2' src={val.image} alt={val.title} />
                        <div className='p-4'>
                            <h3 className='line-clamp-1 py-1 font-bold text-lg text-blue-900'>{val.title}</h3>
                            <p className='line-clamp-3 text-gray-700 text-sm'>{val.description}</p>
                            <h3 className='font-bold text-amber-700 text-xl mt-2'>{formatPrice(val.price)}</h3>
                            <div className='mt-4 flex justify-between '>
                                <button className='px-4 py-2 bg-black font-semibold text-white rounded-full border-2 border-black hover:text-black hover:bg-white'
                                    onClick={() => addToCart(val)}>Add to Cart</button>
                                <button className='px-4 py-2 font-semibold bg-black text-white rounded-full border-2 border-black hover:text-black hover:bg-white'>Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;