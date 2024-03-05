import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios  from 'axios';
const Delivering = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bagItems = location.state && location.state.bagItems;
  const userId = location.state && location.state.userId;
  console.log(userId);
  console.log(bagItems);
  const transformedBagItems = bagItems.map(item => ({
  product: item.product,
  quantity: item.quantity.toString(),
  key: item.key.toString(),
  _id: item._id,
  name: item.name,
  desc: item.desc,
  img: item.img,
  price: item.price.toString(),
  rating: item.rating
}));

console.log(transformedBagItems);

  const totalTime = 60; // Total time in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const interval = setInterval(() => {
    setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
  }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const addOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/orders/${userId}`, transformedBagItems);

      if (response.status === 200) {
        alert('Your order has been placed!');
      } else {
        alert('Oops, something went wrong');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Oops, something went wrong');
    }
  };

  addOrder();
}, [userId, bagItems]);

  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div>
      <h2 className="text-center text-3xl bold">Your Order will be Delivered</h2>
      {bagItems && (
        <div className="flex flex-col items-center mt-8">
          {/* Display bagItems data as needed */}
          <ul>
            {bagItems.map((item) => (
              <li key={item.key}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <div className="relative w-72 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-5 bg-green-500 transition-all duration-1000"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
      {timeLeft === 0 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/order', { state: {userId} })}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Go to Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Delivering;
