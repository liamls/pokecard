import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const BoosterOpening = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [randomIds, setRandomIds] = useState([]);

  const navigate = useNavigate();

  const getRandomId = () => {
    const categories = [
      { min: 1, max: 142, weight: 80 },
      { min: 143, max: 237, weight: 60 },
      { min: 238, max: 288, weight: 20 },
      { min: 289, max: 308, weight: 7 },
      { min: 309, max: 340, weight: 10 },
      { min: 341, max: 379, weight: 2 },
      { min: 380, max: 384, weight: 1 },
      { min: 385, max: 388, weight: 0.1 },
    ];
    let cumulativeWeight = 0;
    const weightedCategories = categories.map((category) => {
      cumulativeWeight += category.weight;
      return { ...category, cumulativeWeight };
    });
    const randomWeight = Math.random() * 100;
    const selectedCategory = weightedCategories.find(
      (category) => randomWeight <= category.cumulativeWeight
    );
    const randomId =
      Math.floor(
        Math.random() * (selectedCategory.max - selectedCategory.min + 1)
      ) + selectedCategory.min;
    return randomId;
  };

  const checkNewCard = (id) => {
    const cards = JSON.parse(sessionStorage.getItem("pokemonIds"));
    if (cards && Array.isArray(cards)) {
      return !cards.includes(id);
    }
    return false;
  };

  const handleCardClick = () => {
    const newCardId = randomIds[currentCard];
    const isCardNew = checkNewCard(newCardId);
    if (isCardNew) {
      let savedPokemonIds =
        JSON.parse(sessionStorage.getItem("pokemonIds")) || [];
      savedPokemonIds.push(newCardId);
      sessionStorage.setItem("pokemonIds", JSON.stringify(savedPokemonIds));
    }
    setCurrentCard(currentCard + 1);
  };

  useEffect(() => {
    setRandomIds(Array.from({ length: 5 }, getRandomId));
  }, []);

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
        flexDirection: "column",
        position: "relative",
      }}
    >
      {currentCard < randomIds.length && randomIds ? (
        <div onClick={handleCardClick} style={{ textAlign: "center" }}>
          <motion.img
            style={{
              height: "5rem",
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: checkNewCard(randomIds[currentCard]) ? 1 : 0.5,
              opacity: checkNewCard(randomIds[currentCard]) ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src="/assets/new.png"
            layout
          />
          <Card cardId={randomIds[currentCard]} />
          <p style={{ fontWeight: "bold", color: "white" }}>
            Tap to get the next card.
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "20px",
              padding: "20px",
            }}
          >
            {randomIds.map((cardId, index) => (
              <motion.img
                key={index}
                src={`/assets/pokemons/${cardId}.png`}
                alt="Pokemon"
                initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ opacity: 0.9, filter: "brightness(1.2)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  width: "15vw",
                  margin: "1vw",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>
          <button
            style={{ margin: "2rem", height: "3rem" }}
            onClick={() => navigate("/carrousel")}
          >
            Open another booster
          </button>
          <button
            style={{ margin: "2rem", height: "3rem" }}
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
