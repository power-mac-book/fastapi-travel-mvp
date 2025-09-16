import React from "react";

const DestinationCard = ({ destination, onSelect }) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(destination);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative">
        {destination.image_path && (
          <img
            src={`http://localhost:8000/uploads/${destination.image_path}`}
            alt={destination.name}
            className="w-full h-48 object-cover"
          />
        )}

        {/* Always-visible High Selling badge */}
        <div className="absolute -left-12 top-4 w-40 transform -rotate-45 bg-red-600 text-white text-center text-xs font-bold py-1 shadow-lg z-10 animate-pulse">
          Hot Selling
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{destination.name}</h3>
        {destination.description && (
          <p className="text-gray-600 text-sm">{destination.description}</p>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
