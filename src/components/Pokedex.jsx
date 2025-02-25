import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import Card from "./Card";

const Pokedex = () => {
    const [pokemonIds, setPokemonIds] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedPokemonIds = JSON.parse(localStorage.getItem('pokemonIds')) || [];
        setPokemonIds(savedPokemonIds);
    }, []);

    const getPokemonImage = (id) => {
        return `/assets/pokemons/image (${id}).png`;
    };

    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);
    const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
    const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);
    const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]);
    const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]);

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
        <div>
            <motion.button
                style={{ margin: "2rem" }}
                onClick={() => navigate("/")}
            >
                Accueil
            </motion.button>
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
                                objectFit: "contain"
                            }}
                        >
                            <motion.img
                                src={getPokemonImage(id)}
                                alt="Pokemon id"
                                initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                whileHover={{ opacity: 0.9, filter: 'brightness(1.2)' }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{
                                    height: "auto",
                                    width: "10vw",
                                    objectFit: "contain",
                                }}
                                onClick={() => handleOpen(id)}
                            />
                        </div>
                    ))
                ) : (
                    <p>Aucun Pokémon n'a été trouvé. Attrape-les dans le booster !</p>
                )}
            </div>
            <Dialog
                onClose={handleClose}
                open={open}
                slotProps={{
                    paper: {
                        style: {
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            backdropFilter: 'blur(1px)',
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
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <Card
                        rotateX={rotateX}
                        rotateY={rotateY}
                        cardRotateX={cardRotateX}
                        cardRotateY={cardRotateY}
                        cardId={selectedId}
                    />
                </motion.div>
            </Dialog>
        </div>
    );
};

export default Pokedex;
