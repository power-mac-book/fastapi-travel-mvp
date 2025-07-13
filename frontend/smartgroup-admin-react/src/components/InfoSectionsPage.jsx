import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';






const InfoSectionsPage = () => {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    section_type: "about", // default
  });

  const fetchSections = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/cms/info-sections");
      setSections(res.data);
    } catch (err) {
      console.error("Failed to load sections", err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/cms/info-sections", formData);
      setFormData({ title: "Title", content: "Content", section_type: "AboutUs" });
      fetchSections();
    } catch (err) {
      console.error("Failed to submit section", err);
    }
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">CMS Info Sections</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6 bg-white shadow p-4 rounded">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <ReactQuill
          theme="snow"
          name="content"
          placeholder="Enter section content here..."
          className="w-full border p-2 rounded"
          rows={4}
          value={formData.content}
          onChange={handleQuillChange}
          required
        />
        <select
          name="section_type"
          value={formData.section_type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="About us">About Us</option>
          <option value="Services">Services</option>
          <option value="Contact Us">Contact Us</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Section
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Existing Sections</h3>
      <div className="space-y-4">
        {sections.map((s) => (
          <div key={s.id} className="border p-3 rounded shadow bg-gray-50">
            <h4 className="font-semibold"> {s.section_type}</h4>
            <p>{s.title}</p>
              <div dangerouslySetInnerHTML={{ __html: s.content }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSectionsPage;
