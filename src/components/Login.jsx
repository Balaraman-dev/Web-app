import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const response = await fetch('http://localhost:80/backend/Login.php',
         { method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData) });
      const result = await response.json();
      if (result.status === 'success') {
        localStorage.setItem("user", JSON.stringify(result.user));
        alert('Login successful!');
        navigate('/');
      } else { alert('Login failed. Check your credentials.'); }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again later.');
    } finally { setLoading(false); }
  };

  return (
    <div className='w-[100vw] h-[75vh] flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-1/4 h-3/5 rounded-lg flex items-center justify-center flex-col gap-8 py-40 bg-black mt-16'>
        <input name='email' type="email" value={formData.email} onChange={handleChange} className='w-3/4 hover:border-amber-400 border-2 text-white border-blue-900 p-2 rounded-md' placeholder='Email Id' required />
        <input name='password' type="password" value={formData.password} onChange={handleChange} className='w-3/4 border-2 hover:border-amber-400 text-white border-blue-900 p-2 rounded-md' placeholder='Password' required />
        <button type="submit" disabled={loading} className={`w-1/2 rounded-xl py-2 bg-blue-900 text-white text-lg font-bold hover:bg-yellow-600 duration-300 hover:text-black ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>{loading ? 'Logging In...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default Login;