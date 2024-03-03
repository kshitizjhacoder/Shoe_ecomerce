// Bag.jsx
import React from 'react';

const Bag = ({ bagItems, removeFromBag, increaseQuantity, decreaseQuantity, buyNow }) => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Your Bag</h1>
      {bagItems.length === 0 ? (
        <p>Your bag is empty</p>
      ) : (
        <div>
          {bagItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>Price: ${item.price}</p>
                <div className="flex items-center">
                  <button onClick={() => decreaseQuantity(item.id)} className="text-gray-500">
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="text-gray-500">
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromBag(item.id)} className="text-red-500 ml-4">
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-8">
            <button onClick={buyNow} className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Buy Now
            </button>
            <p>Total: ${calculateTotal(bagItems)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
};

export default Bag;
