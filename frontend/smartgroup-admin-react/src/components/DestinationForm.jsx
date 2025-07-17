// src/components/DestinationForm.jsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const DestinationForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    itinerary: "",
    inclusions: "",
    exclusions: "",
    highlights: [""],
  });

  const [image, setImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...form.highlights];
    newHighlights[index] = value;
    setForm({ ...form, highlights: newHighlights });
  };

  const addHighlight = () => {
    if (form.highlights.length < 10)
      setForm({ ...form, highlights: [...form.highlights, ""] });
  };

  const removeHighlight = (index) => {
    const updated = form.highlights.filter((_, i) => i !== index);
    setForm({ ...form, highlights: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("itinerary", form.itinerary);
    data.append("inclusions", form.inclusions);
    data.append("exclusions", form.exclusions);
    data.append("highlights", JSON.stringify(form.highlights));
    if (image) data.append("image", image);
    gallery.forEach((file, i) => {
      if (i < 5) data.append("gallery", file);
    });

    try {
      await axios.post("http://localhost:8000/api/v1/cms/upload", data);
      alert("Destination added!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <input
        type="text"
        name="name"
        placeholder="Destination Name"
        className="w-full border p-2 rounded"
        value={form.name}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Short Description"
        className="w-full border p-2 rounded"
        value={form.description}
        onChange={handleChange}
      />

      <label className="block">Itinerary</label>
      <ReactQuill value={form.itinerary} onChange={(val) => handleQuillChange("itinerary", val)} />

      <label className="block">Inclusions</label>
      <ReactQuill value={form.inclusions} onChange={(val) => handleQuillChange("inclusions", val)} />

      <label className="block">Exclusions</label>
      <ReactQuill value={form.exclusions} onChange={(val) => handleQuillChange("exclusions", val)} />

      <div className="mt-4">
        <label className="block">Highlights</label>
        {form.highlights.map((h, i) => (
          <div key={i} className="flex space-x-2 mb-2">
            <input
              type="text"
              value={h}
              onChange={(e) => handleHighlightChange(i, e.target.value)}
              className="w-full border p-2 rounded"
            />
            <button type="button" onClick={() => removeHighlight(i)} className="text-red-500">✕</button>
          </div>
        ))}
        <button type="button" onClick={addHighlight} className="text-blue-600">+ Add Highlight</button>
      </div>

      <div className="mt-4">
        <label className="block">Main Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <div className="mt-4">
        <label className="block">Gallery Images (max 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files).slice(0, 5);
            setGallery(files);
          }}
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default DestinationForm;
