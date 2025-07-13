import React from "react";
import DestinationCard from "./DestinationCard";

const DestinationList = ({ destinations, onSelect }) => {
  if (!destinations || destinations.length === 0) {
    return <p className="text-center text-gray-500">No destinations available.</p>;
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {destinations.map((dest) => (
        <DestinationCard key={dest.id} destination={dest} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default DestinationList;
