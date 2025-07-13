import React from "react";
import TravelRequestList from "../components/TravelRequestList";

const TravelRequestsPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Incoming Travel Requests</h2>
      <TravelRequestList />
    </div>
  );
};

export default TravelRequestsPage;
