import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../App.css"; // Assurez-vous d'avoir un fichier CSS pour le style
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BoosterCarousel = () => {
  const navigate = useNavigate();
  const urlImage = "src/assets/EB05-Booster.png";
  const size = 10;

  const openBooster = () => {
    navigate(`/booster`);
  };
  return (
    <motion.div
      className="booster-carousel-container"
      initial={{ scale: 0.1, opacity: 0.1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        {[...Array(size).keys()].map((index) => (
          <SwiperSlide key={index} onClick={() => openBooster()}>
            <motion.img
              src={urlImage}
              alt={index}
              whileTap={{ scale: 0.8, opacity: 0.5 }}
              whileHover={{ scale: 0.95, rotate: 2, opacity: 0.75 }}
              transition={{ duration: 0.2 }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default BoosterCarousel;
