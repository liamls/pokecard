import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoosterOpening = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);
  const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]);
  const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]);
  const navigate = useNavigate();
  const cards = [...Array(4)];
  const handleMouseMove = (event) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;
    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };
  return (
    <motion.div
      style={{
        perspective: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        overflow: "hidden"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {currentCard < cards.length ? (
        <motion.div
          style={{
            margin: "auto",
            transformStyle: "preserve-3d",
            perspective: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            rotateX,
            rotateY
          }}
          transition={{ velocity: 0 }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              perspective: 800,
              cardRotateX,
              cardRotateY,
              width: "100%", height: "100%",
            }}
            transition={{ velocity: 0 }}>
            <motion.img
              key={currentCard}
              src="https://img.game8.co/4003522/31cffe0b0a2dccac69c03c84adc1003e.png/show"
              initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              whileHover={{ opacity: 0.9, filter: 'brightness(1.2)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setCurrentCard(currentCard + 1)}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.button
          onClick={() => navigate("/carrousel")}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Retour au carrousel
        </motion.button>
      )}
    </motion.div>
  );
};

export default BoosterOpening;
