import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardSummary = () => {
  const [summary, setSummary] = useState([]);

  const fetchSummary = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.error("Failed to load dashboard summary", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Grouped Travel Summary</h3>

      {summary.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Destination</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Travel Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Group Count</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{item.destination}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{item.travel_date}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{item.user_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardSummary;
