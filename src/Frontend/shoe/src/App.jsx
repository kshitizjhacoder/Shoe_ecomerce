import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import './App.css'
import Login from './Components/Login';
import Home from './Components/Home';
import Ordered from './Components/Ordered';
import Bag from './Components/Bag';
import Delivering from './Components/Delivering';

function App() {
  const [userId, setUserId] = useState(null);
  function handleSetUserId(id) {
    console.log('handleSetUserId', id);
    setUserId(id);
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/home' element={<Home handleSetUserId={handleSetUserId} />}></Route>
          <Route path='/ordered' element={<Ordered />}></Route>
          <Route path="/bag" element={<Bag
            userId={userId}
          />}></Route>
          <Route path='/bag/delivery' element={<Delivering />}></Route>
          <Route path="/order" element={<Ordered userId={userId} />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
