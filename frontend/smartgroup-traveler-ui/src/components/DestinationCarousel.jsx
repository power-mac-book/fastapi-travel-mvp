import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const DestinationCarousel = ({ destinations }) => {
  return (
    <div style={{ padding: "2rem 0" }}>
      <h2 style={{ marginBottom: "1rem" }}>
        Book Now @ ₹1: Lock your Holiday Package Price
      </h2>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          576: { slidesPerView: 2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
        }}
      >
        {destinations.map((dest) => (
          <SwiperSlide key={dest.id}>
            <div
              style={{
                position: "relative",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
              }}
              onClick={() => window.alert(`Clicked ${dest.name}`)}
              className="group"
            >
              <img
                src={`http://localhost:8000/uploads/${dest.image_path}`}
                alt={dest.name}
                className="w-full h-[240px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                  color: "#fff",
                  padding: "0.75rem",
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "1rem",
                }}
              >
                {dest.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DestinationCarousel;
