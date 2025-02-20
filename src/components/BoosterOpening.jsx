import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BoosterOpening = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();
  const cards = [...Array(4)];
  console.log(currentCard, cards.length);

  return (
    <div className="booster-opening-container">
      {currentCard < cards.length ? (
        <motion.img
          key={currentCard}
          src="https://img.game8.co/4003522/31cffe0b0a2dccac69c03c84adc1003e.png/show"
          initial={{ scale: 0.5, opacity: 0, rotate: 45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          whileHover={{ opacity: 0.75, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="booster-card"
          onClick={() => setCurrentCard(currentCard + 1)}
        />
      ) : (
        <motion.button
          onClick={() => navigate("/carrousel")}
          className="return-button"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Retour au carrousel
        </motion.button>
      )}
    </div>
  );
};

export default BoosterOpening;
