// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-scroll';
import { Link as L } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="home" className="text-white text-lg font-semibold">
            Home
          </Link>
          <Link to="features" className="text-white ml-4">
            Features
          </Link>
          <Link to="bestseller" className="text-white ml-4">
            Best Sellers
          </Link>
        </div>
        <div className="flex items-center">
          
          <L to="/bag" className="text-white ml-4">
            Bag
          </L>
          <L to="/order" className="text-white ml-4">
            Orders
          </L>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;
