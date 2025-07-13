import React, { useEffect, useState } from "react";
import axios from "axios";

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cms/destinations");
      setDestinations(res.data);
    } catch (err) {
      console.error("Failed to fetch destinations", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
    await axios.delete(`http://localhost:8000/api/v1/cms/delete/${id}`);
    fetchDestinations(); // Refresh list
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

 return (
  <div>
    <h3 className="text-xl font-semibold mb-4">All Destinations</h3>

    {destinations.length === 0 && (
      <p className="text-gray-500">No destinations available.</p>
    )}

    {destinations.map((dest) => (
      <div
        key={dest.id}
        className="border-b border-gray-300 pb-4 mb-6"
      >
        <h4 className="text-lg font-bold text-gray-800">{dest.name}</h4>
        <p className="text-sm text-gray-700 mb-2">{dest.description}</p>

        {dest.image_path && (
          <img
            src={`http://localhost:8000/uploads/${dest.image_path}`}
            alt={dest.name}
            className="w-32 h-auto rounded mb-2 shadow"
          />
        )}

        {/* <button
          onClick={() => handleDelete(dest.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
        >
          Delete
        </button> */}
      </div>
    ))}
  </div>
);
};

export default DestinationList;
