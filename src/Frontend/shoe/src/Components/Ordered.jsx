// Ordered.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Ordered = ({userId}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state && location.state.userId;
  const [orderedItems, setOrderedItems] = useState([]);
  console.log(user);
  console.log(userId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          const response = await axios.get(`http://localhost:3000/orders/${userId}`); // Replace with your actual API endpoint
          console.log(response.data);
          setOrderedItems(response.data);
        } else {
          const response = await axios.get(`http://localhost:3000/orders/${user}`); // Replace with your actual API endpoint
          console.log(response.data);
          setOrderedItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching ordered items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Ordered Items</h1>
      <div className="grid grid-cols-4 gap-4">
        {orderedItems.map((item, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-md">
            <img src={item.img} alt={item.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
            <p className="text-lg font-bold">${item.price}</p>
            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            <p className="text-sm text-gray-500">Order Date: {new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordered;
