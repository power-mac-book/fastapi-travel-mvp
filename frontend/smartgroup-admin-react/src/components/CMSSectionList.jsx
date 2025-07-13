// src/components/CMSSectionList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CMSSectionList = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/cms/info-sections")
      .then((res) => setSections(res.data))
      .catch((err) => console.error("Failed to fetch CMS sections", err));
  }, []);

  return (
    <div className="mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">All Info Sections</h2>
      {sections.length === 0 ? (
        <p className="text-gray-500">No CMS sections added yet.</p>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.id}
              className="border-b pb-4 mb-4"
            >
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-sm text-gray-500 mb-1">
                title: <code>{section.title}</code>
              </p>
              <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CMSSectionList;
