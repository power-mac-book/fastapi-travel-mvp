import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";
import TravelRequestsPage from "./pages/TravelRequestsPage";
import DestinationsPage from "./pages/DestinationsPage";
import CMSSectionPage from "./pages/CMSSectionPage";

import ProtectedRoute from "./components/ProtectedRoute";

const DashboardLayout = () => {
    const handleLogout = () => {
    localStorage.removeItem("access_token"); // Assuming JWT token is stored here
    navigate("/admin-login");               // Redirect to login page after logout
   };
   return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Navigation */}
      <nav style={{ width: "250px", background: "#f4f4f4", padding: "1rem" }}>
        <h2 className="text-2xl font-bold text-blue-600">SmartGroup Admin Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
          <li><Link to="/destinations" className="hover:text-blue-500">Destinations</Link></li>
          <li><Link to="/requests"className="hover:text-blue-500">Travel Requests</Link></li>
          <li><Link to="/cms-sections" className="hover:text-blue-500">CMS Info Sections</Link></li>
          <li><Link onClick={handleLogout}>Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/requests" element={<TravelRequestsPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/cms-sections" element={<CMSSectionPage />} />
          <Route path="/admin-login" element={<AdminLoginPage />} />
          
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route: Admin Login */}
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected routes: Only visible after login */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
