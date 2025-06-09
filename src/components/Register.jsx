import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      place: formData.get('place')
    };

    try {
      const response = await fetch('http://localhost/backend/Register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('Registration successful!');
        navigate('/login'); 
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration.');
    }
  };

  return (
    <div className='w-[100vw] h-[75vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-1/4 py-12 bg-black rounded-lg flex flex-col items-center gap-8'>

        <input type="text" name="name" placeholder='UserName' required className=' border-2 border-blue-900 p-2 text-white rounded-md hover:border-amber-400 bg-transparent w-2/3'/>
        <input type="email" name="email" placeholder='Email Id' required className=' border-2 border-blue-900 p-2 text-white rounded-md hover:border-amber-400 bg-transparent w-2/3'/>
        <input type="password" name="password" placeholder='Password' required className=' border-2 border-blue-900 p-2 text-white rounded-md hover:border-amber-400 bg-transparent w-2/3'/>
        <input type="text" name="place" placeholder='Landmark' required className=' border-2 border-blue-900 p-2 text-white rounded-md hover:border-amber-400 bg-transparent w-2/3'/>
        <button type="submit" className='py-2 px-8 bg-blue-900 text-white font-bold rounded hover:bg-yellow-600 duration-300 '>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;