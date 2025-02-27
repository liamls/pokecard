import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import Card from "./Card";

const Pokedex = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [open, setOpen] = useState(false);
  const cards = JSON.parse(sessionStorage.getItem("pokemonIds")).length;
  const [selectedId, setSelectedId] = useState(null);
  const handleOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPokemonIds =
      JSON.parse(sessionStorage.getItem("pokemonIds")) || [];
    setPokemonIds(savedPokemonIds.sort((a, b) => a - b));
  }, []);

  const getPokemonImage = (id) => {
    return `/assets/pokemons/${id}.png`;
  };

  return (
    <div>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <button style={{ margin: "2rem" }} onClick={() => navigate("/")}>
          Home
        </button>
        <h1 style={{ color: "black", fontSize: "2rem", margin: "2rem" }}>
          {cards} / 388 cards{" "}
        </h1>
      </motion.div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {pokemonIds.length > 0 ? (
          pokemonIds.map((id) => (
            <div
              key={id}
              style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                objectFit: "contain",
              }}
            >
              <motion.img
                src={getPokemonImage(id)}
                alt="Pokemon id"
                initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ opacity: 0.9, filter: "brightness(1.2)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  height: "auto",
                  width: "15vw",
                  objectFit: "contain",
                  borderRadius: "10px",
                }}
                onClick={() => handleOpen(id)}
              />
            </div>
          ))
        ) : (
          <p>Open a booster, no pokemon were found.</p>
        )}
      </div>
      <Dialog
        onClose={handleClose}
        open={open}
        slotProps={{
          paper: {
            style: {
              backgroundColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(1px)",
            },
          },
        }}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            perspective: 800,
            overflow: "hidden",
          }}
        >
          <Card cardId={selectedId} />
        </motion.div>
      </Dialog>
    </div>
  );
};

export default Pokedex;
