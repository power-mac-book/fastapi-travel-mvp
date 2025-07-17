import React, { useEffect,useState } from "react";
import { submitTravelRequest } from "../api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const TravelForm = ({ selectedDestination }) => {
  const [form, setForm] = useState({
    travel_date: "",
    user_email: "",
    phone_number: "",
    num_persons: 1,
  });

  const [submitted, setSubmitted] = useState(false);

  // Inside your TravelForm.jsx
const [highlightedDates, setHighlightedDates] = useState([]);

useEffect(() => {
  if (selectedDestination?.name) {
    fetch(`http://localhost:8000/api/v1/travel/destination-interest-dates/${selectedDestination.name}`)
      .then(res => res.json())
      .then(data => {
        const dates = data.map(d => new Date(d.travel_date));
        setHighlightedDates(dates);
      })
      .catch(console.error);
  }
}, [selectedDestination]);


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDestination) return;

    const payload = {
      destination: selectedDestination.name,
      ...form,
    };

    try {
      const result = await submitTravelRequest(payload);
      console.log(result);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="mt-4 bg-green-100 text-green-700 p-4 rounded">
        <strong>Success!</strong> Your interest has been recorded.
      </div>
    );
  }

  return (
    <div className="mt-6 flex justify-end">   
      <form
      onSubmit={handleSubmit}
      className=" bg-white rounded-lg"
  >
      <h3 className="text-xl font-semibold mb-4">
        Show Interest in "{selectedDestination.name}"
      </h3>

      <div className="mb-4">
        <label className="block font-medium mb-1">Travel Date</label>
        <DatePicker
        selected={form.travel_date}
        onChange={(date) => setForm({ ...form, travel_date: date })}
        highlightDates={highlightedDates}
        placeholderText="Select your travel date"
        className="border p-2 rounded w-full"
        />

       </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="user_email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          placeholder="Optional"
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">No. of Persons</label>
        <input
          type="number"
          name="num_persons"
          min="1"
          value={form.num_persons}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enquire
      </button>
    </form>
  </div>);
};

export default TravelForm;
