import React, { useEffect, useState } from "react";
import DestinationList from "../components/DestinationList";
import TravelForm from "../components/TravelForm";
import DestinationCarousel from "../components/DestinationCarousel";
import TrendingDestinationsChart from "../components/TrendingDestinationsChart";
import TrendingModal from "../components/TrendingModal";
import IntroModal from "../components/IntroModal";

const HomePage = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [infoSections, setInfoSections] = useState([]);



  useEffect(() => {
    fetch("http://localhost:8000/api/v1/cms/destinations")
      .then((res) => res.json())
      .then(setDestinations)
      .catch((err) => console.error("Failed to load destinations", err));

    fetch("http://localhost:8000/api/v1/cms/info-sections")
      .then((res) => res.json())
      .then(setInfoSections)
      .catch((err) => console.error("Failed to load info sections", err));
  }, []);

  const renderSection = (type) => {
    const section = infoSections.find(
      (sec) => sec.section_type.toLowerCase() === type.toLowerCase()
    );

    if (!section) return null;

    return (
      <div key={type} className="my-8">
        <h2 className="text-gray-700">{section.section_type}</h2>
        <p className="text-2xl font-semibold mb-2">{section.title}</p>
        <p className="text-gray-700">{section.content}</p>
        
      </div>
    );
  };

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-6">

       <IntroModal />
      <DestinationCarousel destinations={destinations} />
      <TrendingModal />

      {!selectedDestination && (
        <>
          <h1 className="text-3xl font-bold text-center mb-4">SmartGroup Travel</h1>
          <TrendingDestinationsChart />
          <p className="text-center text-gray-600 mb-6">
            Explore our latest travel destinations:
          </p>

          <DestinationList
            destinations={destinations}
            onSelect={(dest) => setSelectedDestination(dest)}
          />

          {/* ✅ Render Info Sections */}
          {renderSection("about")}
          {renderSection("services")}
          {renderSection("contact")}
        </>
      )}

      {selectedDestination && (
        <>
          <button
            onClick={() => setSelectedDestination(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back to Destinations
          </button>

          <h2 className="text-2xl font-semibold mb-2">{selectedDestination.name}</h2>
          <p className="text-gray-700 mb-4">{selectedDestination.description}</p>

          {selectedDestination.image_path && (
            <img
              src={`http://localhost:8000/uploads/${selectedDestination.image_path}`}
              alt={selectedDestination.name}
              className="w-full max-w-3xl rounded-lg mb-4"
            />
          )}

          <TravelForm selectedDestination={selectedDestination} />
        </>
      )}
    </div>
  );
};

export default HomePage;
