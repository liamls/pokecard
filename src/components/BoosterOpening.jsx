import React from "react";
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
  const cards = [...Array(5)];
  const handleMouseMove = (event) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;
    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const getRandomPokemonImage = () => {
    const idCard = Math.floor((Math.random() * 421) + 1);
    let savedPokemonIds = JSON.parse(localStorage.getItem('pokemonIds')) || [];
    if (!savedPokemonIds.includes(idCard)) {
      savedPokemonIds.push(idCard);
      localStorage.setItem('pokemonIds', JSON.stringify(savedPokemonIds));
    }
    return `/assets/pokemons/image (${idCard}).png`;
  }

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
              src={getRandomPokemonImage()}
              alt="Random pokemon"
              initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              whileHover={{ opacity: 0.9, filter: 'brightness(1.2)' }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setCurrentCard(currentCard + 1)}
              style={{
                height: "50vh",
              }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <>
          <button
            style={{ margin: "2rem" }}
            onClick={() => navigate("/carrousel")}
          >
            Ouvrir un autre booster
          </button>
          <button
            style={{ margin: "2rem" }}
            onClick={() => navigate("/")}
          >
            Accueil
          </button>
        </>

      )}
    </motion.div>
  );
};

export default BoosterOpening;