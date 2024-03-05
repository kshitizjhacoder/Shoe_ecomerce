import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Delivering = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bagItems = location.state && location.state.bagItems;
  const userId = location.state && location.state.userId;
  console.log(userId);
  const totalTime = 60; // Total time in seconds
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      // Redirect to the order page once the time is completed
      navigate('/order', { state: { userId } });
    }
  }, [timeLeft, navigate]);

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
