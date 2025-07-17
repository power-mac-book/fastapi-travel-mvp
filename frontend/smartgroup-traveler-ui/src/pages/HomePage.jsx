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

      {!selectedDestination ? (
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

          {/* Render CMS sections */}
          {renderSection("about")}
          {renderSection("services")}
          {renderSection("contact")}
        </>
      ) : (
        <>
          <button
            onClick={() => setSelectedDestination(null)}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back to Destinations
          </button>

          {/* 2-column layout: left content + right sidebar form */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column (Details) */}
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2">{selectedDestination.name}</h2>
              <img
                src={`http://localhost:8000/uploads/${selectedDestination.image_path}`}
                alt={selectedDestination.name}
                className="w-full h-auto rounded-lg mb-4"
              />
              <p className="text-gray-700 mb-4">{selectedDestination.description}</p>

              {selectedDestination.highlights?.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold">Highlights</h3>
                  <ul className="list-disc ml-5">
                    {selectedDestination.highlights.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedDestination.itinerary && (
                <div className="mb-4">
                  <h3 className="font-semibold">Itinerary</h3>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: selectedDestination.itinerary }}
                  />
                </div>
              )}

              {selectedDestination.inclusions && (
                <div className="mb-4">
                  <h3 className="font-semibold">Inclusions</h3>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: selectedDestination.inclusions }}
                  />
                </div>
              )}

              {selectedDestination.exclusions && (
                <div className="mb-4">
                  <h3 className="font-semibold">Exclusions</h3>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: selectedDestination.exclusions }}
                  />
                </div>
              )}

              {selectedDestination.gallery?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {selectedDestination.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8000/uploads/${img}`}
                      alt={`Gallery image ${i + 1}`}
                      className="rounded shadow"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar (Form) */}
            <div className="md:w-1/3 md:sticky top-6 self-start h-fit">
              <div className="bg-white border p-4 rounded-lg shadow-lg">
                <TravelForm selectedDestination={selectedDestination} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
