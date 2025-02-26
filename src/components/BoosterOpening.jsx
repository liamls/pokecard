import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const BoosterOpening = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [obtainedCards, setObtainedCards] = useState([]);
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
    const weightedCategories = categories.map(category => {
      cumulativeWeight += category.weight;
      return { ...category, cumulativeWeight };
    });
    const randomWeight = Math.random() * 100;
    const selectedCategory = weightedCategories.find(
      category => randomWeight <= category.cumulativeWeight
    );
    const randomId = Math.floor(Math.random() * (selectedCategory.max - selectedCategory.min + 1)) + selectedCategory.min;
    return randomId;
  };

  const checkNewCard = (id) => {
    const cards = JSON.parse(sessionStorage.getItem('pokemonIds'));
    if (cards && Array.isArray(cards)) {
      return cards.includes(id);
    }
    return false;
  };

  const handleCardClick = () => {
    const newCardId = getRandomId();
    const isCardNew = !checkNewCard(newCardId);
    setIsNew(isCardNew);
    if (isCardNew) {
      let savedPokemonIds = JSON.parse(sessionStorage.getItem('pokemonIds')) || [];
      savedPokemonIds.push(newCardId);
      sessionStorage.setItem('pokemonIds', JSON.stringify(savedPokemonIds));
    }
    setObtainedCards([...obtainedCards, newCardId]);
    setCurrentCard(currentCard + 1);
  };

  console.log(obtainedCards, currentCard);

  useEffect(() => {
    if (currentCard === 0) {
      handleCardClick();
    }
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
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      {currentCard < cards.length ? (
        <div onClick={handleCardClick}>
          {isNew ? (<h1 style={{ color: "white", "-webkit-text-stroke": "0.1rem black" }}>NEW !</h1>) : null}
          <Card
            rotateX={rotateX}
            rotateY={rotateY}
            cardRotateX={cardRotateX}
            cardRotateY={cardRotateY}
            cardId={obtainedCards[currentCard + 1]}
          />
          <p style={{ fontWeight: "bold", color: "white" }}>Tap to get the next card.</p>
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
            {obtainedCards.map((cardId, index) => (
              <motion.img
                key={index}
                src={`/assets/pokemons/${cardId}.png`}
                alt="Pokemon"
                initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ opacity: 0.9, filter: 'brightness(1.2)' }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  width: "15vw",
                  margin: "1vw",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
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
