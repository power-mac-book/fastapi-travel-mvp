// src/pages/DestinationsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import DestinationForm from "../components/DestinationForm";
import DestinationList from "../components/DestinationList";

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);

  // Function to fetch all destinations
  const fetchDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cms/destinations");
      setDestinations(res.data);
    } catch (err) {
      console.error("Failed to fetch destinations", err);
    }
  };

  // On mount, load the list
  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Manage Destinations</h2>

      {/* Pass fetchDestinations as onAdd so the form can refresh the list */}
      <DestinationForm onAdd={fetchDestinations} />

      <hr style={{ margin: "2rem 0" }} />

      <DestinationList destinations={destinations} />
    </div>
  );
};

export default DestinationsPage;
