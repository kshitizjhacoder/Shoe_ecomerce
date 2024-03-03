import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import './App.css'
import Login from './Components/Login';
import Home from './Components/Home';
import Ordered from './Components/Ordered';
import Bag from './Components/Bag';
function App() {
  const [bagItems, setBagItems] = useState([
    { id: 1, title: 'Shoe 1', image: 'data:image/jpeg;base64,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', price: 50.00, quantity: 2 },
    { id: 2, title: 'Shoe 2', image: 'data:image/jpeg;base64,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', price: 65.00, quantity: 1 },
  ]);
  const removeFromBag = (itemId) => {
    // Logic to remove item from the bag
    setBagItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  const increaseQuantity = (itemId) => {
    // Logic to increase item quantity
    setBagItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const decreaseQuantity = (itemId) => {
    // Logic to decrease item quantity
    setBagItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  
  const buyNow = () => {
    // Logic for the "Buy Now" functionality
    // You might want to navigate to a checkout page or perform other actions here
    console.log('Buy Now clicked');
  };
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/ordered' element={<Ordered />}></Route>
          <Route path="/bag" element={<Bag
          bagItems={bagItems}
          removeFromBag={removeFromBag}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          buyNow={buyNow}
          />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App