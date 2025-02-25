import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const BoosterOpening = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);
  const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]);
  const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]);
  const navigate = useNavigate();
  const cards = [...Array(5)];

  const handleMouseMove = (event) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;
    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const offsetX = touch.clientX - window.innerWidth / 2;
    const offsetY = touch.clientY - window.innerHeight / 2;
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
        overflow: "hidden",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      {currentCard < cards.length ? (
        <div onClick={() => setCurrentCard(currentCard + 1)}>
          <Card
            rotateX={rotateX}
            rotateY={rotateY}
            cardRotateX={cardRotateX}
            cardRotateY={cardRotateY}
            cardId={Math.floor(Math.random() * 421) + 1}
          />
          <p style={{ fontWeight: "bold", color: "white" }}>Tap to get the next card.</p>
        </div>
      ) : (
        <>
          <button
            style={{ margin: "2rem", color: black }}
            onClick={() => navigate("/carrousel")}
          >
            Open another booster
          </button>
          <button
            style={{ margin: "2rem" }}
            onClick={() => navigate("/")}
          >
            Home
          </button>
        </>
      )}
    </motion.div>
  );
};

export default BoosterOpening;
