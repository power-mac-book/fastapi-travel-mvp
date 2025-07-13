import React from "react";
import DashboardSummary from "../components/DashboardSummary";

const DashboardPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <DashboardSummary />
    </div>
  );
};

export default DashboardPage;
