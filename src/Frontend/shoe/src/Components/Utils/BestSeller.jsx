import React from 'react';
import Cards from './Cards';

function BestSeller({ onCardClick, bestseller }) {
    // Assuming bestseller is an array received as a prop
    // console.log(bestseller);
  return (
    <div id="bestseller">
      <h1 className="font-bold text-3xl m-4">Best Sellers</h1>
      <div className="flex justify-center items-center flex-wrap">
        {bestseller.map((seller, index) => (
          <Cards
            key={index}
            image={seller.img}
            name={seller.name}
            price={seller.price}
            onClick={() => onCardClick(seller)} // Pass the correct object to onCardClick
          />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
