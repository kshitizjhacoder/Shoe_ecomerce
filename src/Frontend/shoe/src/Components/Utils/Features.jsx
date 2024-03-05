// Features.jsx
import React from 'react';
import Cards from './Cards';

const Features = ({ onCardClick, latestVisits }) => {
  let features = Array.isArray(latestVisits) ? latestVisits : [];
  if (features.length > 0) {
    features = features[0];
    // console.log(features);
  }
  if (!Array.isArray(features) || features.length === 0) {
    return <div></div>;
  }
  const cardsPerPage = 5;
  const totalCards = features.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 2 + totalPages) % totalPages + 1);
  };

  const visibleFeatures = features.slice(startIndex, endIndex);

  const handleClick = (feature) => {
    // console.log(feature);
    onCardClick(feature);
  };

  return (
    <div id='features' className="flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Features</h1>
      <div className="mt-2 flex justify-between items-center">
        <i
          onClick={handlePrevPage}
          className="fas fa-chevron-left text-2xl cursor-pointer"
        />
        <div className="flex overflow-x-auto transition-transform duration-300 ease-in-out">
          {visibleFeatures.map((feature, index) => (
          <div key={index} className="index">
            {feature.product && (
              <Cards
                image={feature.product.img}
                name={feature.product.name}
                price={feature.product.price}
                onClick={() => handleClick(feature.product)}
                onMouseOver={() => console.log('Mouse over')}
              />
            )}
          </div>
        ))}
        </div>
        <i
          onClick={handleNextPage}
          className="fas fa-chevron-right text-2xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Features;
