// src/components/DestinationCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";

const DestinationCarousel = ({ destinations }) => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Book Now @ ₹1: Lock your Holiday Package Price
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
         // 576: { slidesPerView: 2 },
         // 768: { slidesPerView: 3 },
         // 1024: { slidesPerView: 4 },
        }}
      >
        {destinations.map((dest) => (
          <SwiperSlide key={dest.id}>
            <div
              style={{
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              onClick={() => window.alert(`Clicked ${dest.name}`)}
            >
              <img
                src={`http://localhost:8000/uploads/${dest.image_path}`}
                alt={dest.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "#fff",
                  padding: "0.5rem",
                  textAlign: "center",
                }}
              >
                <strong>{dest.name}</strong>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationCarousel;
