import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FreeMode } from 'swiper/modules';

const BoosterCarousel = () => {
  const navigate = useNavigate();
  const urlImage = "/assets/EB05-Booster.png";
  const size = 10;

  const openBooster = () => {
    navigate(`/booster`);
  };

  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0.1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Swiper
        slidesPerView={2.25}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={20}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        freeMode={true}
        modules={[FreeMode]}
        style={{ width: "100%", height: "100%" }}
      >
        {[...Array(size).keys()].map((index) => (
          <SwiperSlide key={index} onClick={openBooster}>
            <motion.img
              src={urlImage}
              alt={`Booster ${index}`}
              whileTap={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 0.95, rotate: 2, opacity: 0.75 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "90%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BoosterCarousel;
