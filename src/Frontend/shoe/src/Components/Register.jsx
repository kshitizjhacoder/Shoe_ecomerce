// src/components/Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Handle registration logic here
    try {
      const response = await axios.post('http://127.0.0.1:3000/auth/register', formData);
      console.log('Registration successful:', response.data);
      // Redirect to the home page or any other page after successful registration
      navigate('/home', { state: { userId: response.data.userId } });
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleLoginClick = () => {
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 shadow-md rounded-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
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
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>
        <p className="mt-2 text-gray-600">
          Already registered?{' '}
          <button
            type="button"
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={handleLoginClick}
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
