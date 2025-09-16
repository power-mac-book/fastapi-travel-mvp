import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

function App() {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/agent")
      .then((res) => res.json())
      .then((data) => setAgent(data))
      .catch(() => setAgent(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={<Layout agent={agent} loading={loading} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
