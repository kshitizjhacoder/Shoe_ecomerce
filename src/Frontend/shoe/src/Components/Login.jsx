// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate login logic (replace with actual authentication logic)
    if (!email || !password) {
      setLoginError(true);
      console.log('Login failed. Not Entered any field.');
    }
      try {
        const response = await axios.post("http://127.0.0.1:3000/auth/login", formData);
        if (response.status === 200) {
          console.log(response.data.userId);
          navigate('/home', { state: { userId: response.data.userId } });
        } else if(response.status === 404){
          alert("User not found try sign up");
          setLoginError(true);
        } else {
          alert('Invalid Credentials!');
          setLoginError(true);
        }
      } catch (err) {
        alert(`An error occurred: ${err}`);
      }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        {loginError && (
          <p className="text-red-500 text-sm mb-2">Invalid email or password. Please try again.</p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
