// src/components/TravelRequestList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TravelRequestList = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/travel");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch travel requests", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
   <div className="p-6 bg-white shadow rounded-lg">
  <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Travel Requests</h3>

  {requests.length === 0 ? (
    <p className="text-gray-500">No travel requests submitted yet.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Destination</th>
            <th className="py-3 px-4 text-left">Date</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Phone</th>
            <th className="py-3 px-4 text-left">Persons</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {requests.map((r) => (
            <tr key={r.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">{r.id}</td>
              <td className="py-3 px-4">{r.destination}</td>
              <td className="py-3 px-4">{r.travel_date}</td>
              <td className="py-3 px-4">{r.user_email}</td>
              <td className="py-3 px-4">{r.phone_number}</td>
              <td className="py-3 px-4">{r.num_persons}</td>
              <td className="py-3 px-4 space-x-2">
                <button type="button"className="inline-block bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded shadow hover:bg-blue-600 hover:shadow-lg transition duration-200">Confirm</button>

                <button type="button"className="inline-block bg-yellow-500 text-white font-semibold text-sm px-4 py-2 rounded shadow hover:bg-yellow-600 hover:shadow-lg transition duration-200">Notify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

  );
};

export default TravelRequestList;
