// src/components/SlideshowModal.jsx
import React, { useEffect, useState } from "react";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

const sampleImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
];

const SlideshowModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [whatsApp, setWhatsApp] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500); // Open shortly after load
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`We'll connect you via WhatsApp: ${whatsApp}`);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white w-full max-w-5xl rounded-lg overflow-hidden shadow-lg flex flex-col md:flex-row">
        {/* Left: Image slider */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <Swiper
             modules={[Autoplay]}
             autoplay={{ delay: 2500 }}
            loop
            className="h-80 w-100"
          >
            {sampleImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={`${src}?auto=format&fit=crop&w=800&q=80`}
                  alt={`Slide ${idx}`}
                  className="w-100 h-80 object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-2">Join Our Travel Group</h2>
          <p className="text-sm text-gray-600 mb-4">
            Get exclusive discounts by joining group travel plans!
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="tel"
              placeholder="Enter your WhatsApp number"
              value={whatsApp}
              onChange={(e) => setWhatsApp(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <div className="flex justify-between gap-2">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
              >
                Notify Me
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full border border-gray-400 hover:bg-gray-100 text-gray-700 py-2 rounded"
              >
                Skip
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SlideshowModal;
