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
      {destination.image_path && (
        <img
          src={`http://localhost:8000/uploads/${destination.image_path}`}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
      )}
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
