// Bag.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Bag = ({ userId }) => {
  const [bagItems, setBagItems] = useState([]);
  const navigate = useNavigate();
  const extractedItem=(itemId)=>{
    return bagItems.find(item => item.key === itemId);
  }
  const removeFromBag = async(itemId) => {
    // Logic to remove item from the bag
    // console.log(itemId);
    const prodId = extractedItem(itemId).product;
    try {
      const response = await axios.delete(`http://127.0.0.1:3000/bags/${userId}/${prodId}`);
      if (response.status === 200) {
        setBagItems((prevItems) => prevItems.filter((item) => item.key !== itemId));
      } else {
        console.log('Failed to delete item');
      }
    } catch (err) {
      console.error(err);
    }
  };
  const increaseQuantity = async(itemId) => {
    // Logic to increase item quantity
    try{
     const { product, quantity: currentQuantity } = extractedItem(itemId);
    // Increase quantity
    const newQuantity = currentQuantity + 1;
    // Make a PUT request to update the bag item quantity
    const response = await axios.put(`http://127.0.0.1:3000/bags/${userId}/${product}`, {
      quantity: newQuantity,
    });
    if (response.status === 200) {
      // Update the local state with the increased quantity
      setBagItems((prevItems) =>
        prevItems.map((item) =>
          item.key === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      console.log("Failed to increase quantity");
    }
  } catch (err) {
    console.log("Error increasing quantity", err);
  }
  };
  
  const decreaseQuantity = async(itemId) => {
    try {
    // Get product ID and current quantity
    const { product, quantity: currentQuantity } = extractedItem(itemId);

    // Ensure quantity does not go below 1
    const newQuantity = Math.max(currentQuantity - 1, 1);

    // Make a PUT request to update the bag item quantity
    const response = await axios.put(`http://127.0.0.1:3000/bags/${userId}/${product}`, {
      quantity: newQuantity,
    });

    if (response.status === 200) {
      // Update the local state with the decreased quantity
      setBagItems((prevItems) =>
        prevItems.map((item) =>
          item.key === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      console.log("Failed to decrease quantity");
    }
  } catch (err) {
    console.log("Error decreasing quantity", err);
  }
  };
  
  const buyNow = () => {
    // after clicking on the buy now send the bag items to the Delivering page
    // routes are /bag/delivery 
    navigate('/bag/delivery', { state: { bagItems, userId } });
    console.log('Buy Now clicked');
  };
  
  
  useEffect(() => {
    const fetchBagdata = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/bags/${userId}`);
        const fetchedBagItems = response.data;
        // console.log(fetchedBagItems);
        if (!fetchedBagItems || fetchedBagItems.length === 0) {
          console.log('No items in your shopping bag.');
        } else {
          // Accumulate the results in this array
          const updatedBagItems = [];

          for (let i = 0; i < fetchedBagItems.length; i++) {
            try {
              const res = await axios.get(`http://127.0.0.1:3000/home/product/${fetchedBagItems[i].product}`);
              // console.log(res.data);
              const combine = {
                product:fetchedBagItems[i].product,
                quantity: fetchedBagItems[i].quantity,
                key:i,
                ...res.data
              };
              console.log(combine);
              // Add the result to the array
              updatedBagItems.push(combine);
            } catch (err) {
              console.log(err);
            }
          }

          // Set the bagItems state after the loop
          setBagItems(updatedBagItems);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchBagdata();
  }, [userId]);
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Your Bag</h1>
      {bagItems.length === 0 ? (
        <p>Your bag is empty</p>
      ) : (
        <div>
            {bagItems.map((item) => (
            <div key={item.key} className="flex items-center border-b border-gray-300 py-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Price: ${item.price}</p>
                <div className="flex items-center">
                  <button onClick={() => decreaseQuantity(item.key)} className="text-gray-500">
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.key)} className="text-gray-500">
                    +
                  </button>
                </div>
              </div>
              <button onClick={() => removeFromBag(item.key)} className="text-red-500 ml-4">
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
