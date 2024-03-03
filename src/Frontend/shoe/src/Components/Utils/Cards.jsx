// CardComponent.jsx
import React from 'react';

const Cards = ({ image, name, price, onClick }) => {
  // console.log(image);
  return (
    <div className="bg-white p-4 shadow-md rounded-md" onClick={onClick}>
      {image && <img src={image} alt={name} className="mb-2 w-full h-32 object-cover rounded-md" />}
      <h3 className="text-lg font-semibold text-black">{name}</h3>
      <p className="text-gray-600">${price}</p>
    </div>
  );
};

export default Cards;
