// Ordered.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Ordered = () => {
  const [orderedItems, setOrderedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          // const response = await axios.get('/api/ordered'); // Replace with your actual API endpoint
          const feature = { id: 1,date: 12/2023 , name: 'Demo Feature', desc: 'Billi jo bhut cute hai dekh rahi hai', price: '19.99', image: 'data:image/jpeg;base64,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' };
          const data = Array(10).fill(feature)
        setOrderedItems(data);
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
            <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
            <p className="text-lg font-bold">${item.price}</p>
            <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ordered;
