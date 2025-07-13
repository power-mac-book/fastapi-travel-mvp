import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import DestinationsPage from "./pages/DestinationsPage";
import TravelRequestsPage from "./pages/TravelRequestsPage";
import DashboardPage from "./pages/DashboardPage"; // ✅ correct
import CMSSectionPage from "./pages/CMSSectionPage";


const App = () => {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar Navigation */}
        <nav style={{ width: "250px", background: "#f4f4f4", padding: "1rem" }}>
          <h2 className="text-2xl font-bold text-blue-600">SmartGroup Admin Dashboard</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/requests">Travel Requests</Link></li>
            <li> <Link to="/cms-sections" className="hover:text-blue-500">CMS Info Sections</Link></li>

          </ul>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "2rem" }}>
    
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/requests" element={<TravelRequestsPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
         <Route path="//cms-sections" element={<CMSSectionPage />} />
      </Routes>
    
        </main>
      </div>
    </Router>
  );
};

export default App;