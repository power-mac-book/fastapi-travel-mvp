// src/components/TrendingModal.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const TrendingModal = () => {
  const [open, setOpen] = useState(false);
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrending = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/v1/travel/trending");
      if (!res.ok) throw new Error("Failed to fetch trends");
      const data = await res.json();
      setTrendingData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  const chartData = {
    labels: trendingData.map((d) => d.destination),
    datasets: [
      {
        label: "Interested Travelers",
        data: trendingData.map((d) => d.total_persons),
        backgroundColor: "#3B82F6",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} travelers`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: "No. of Persons",
        },
      },
    },
  };

  const handleOpen = () => {
    setOpen(true);
    fetchTrending();
  };

  return (
    <>
      <div className="text-center my-4">
        <button
          onClick={handleOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
          ✈️ See Trending Destinations
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <Dialog.Title className="text-xl font-semibold mb-4 text-center">
              📈 Trending Group Destinations
            </Dialog.Title>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/744/744465.png"
                  alt="Loading..."
                  className="w-16 h-16 animate-bounce"
                />
                <p className="mt-2 text-gray-600">Preparing your flight path...</p>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">Error: {error}</p>
            ) : trendingData.length === 0 ? (
              <p className="text-center text-gray-500">No trending data available yet.</p>
            ) : (
              <Bar data={chartData} options={chartOptions} />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default TrendingModal;
