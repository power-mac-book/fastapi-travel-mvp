// src/components/TrendingDestinationsChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TrendingDestinationsChart = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/travel/trending")
      .then((res) => res.json())
      .then(setTrending)
      .catch((err) => console.error("Failed to load trending destinations", err));
  }, []);

  const data = {
    labels: trending.map((item) => item.destination),
    datasets: [
      {
        label: "Interested Travelers (±30 days)",
        data: trending.map((item) => item.total_persons),
        backgroundColor: "#3B82F6", // Tailwind blue-500
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4 mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">
        🔥 Trending Destinations
      </h2>
      {trending.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-center text-gray-500">Loading trends...</p>
      )}
    </div>
  );
};

export default TrendingDestinationsChart;
