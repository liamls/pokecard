import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FreeMode } from 'swiper/modules';

const BoosterCarousel = () => {
  const navigate = useNavigate();
  const urlImage = "src/assets/EB05-Booster.png";
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
        width: "100%"
      }}
    >
      <Swiper
        slidesPerView={3}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
        freeMode={true}
        modules={[FreeMode]}
      >
        {[...Array(size).keys()].map((index) => (
          <SwiperSlide key={index} onClick={() => openBooster()}>
            <motion.img
              src={urlImage}
              alt={index}
              whileTap={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 0.95, rotate: 2, opacity: 0.75 }}
              transition={{ duration: 0.2 }}
              style={{ height: "50vh" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BoosterCarousel;
