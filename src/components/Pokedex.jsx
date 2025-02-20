import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Pokedex = () => {
    const [pokemonIds, setPokemonIds] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const savedPokemonIds = JSON.parse(localStorage.getItem('pokemonIds')) || [];
        setPokemonIds(savedPokemonIds);
    }, []);

    const getPokemonImage = (id) => {
        return `/assets/pokemons/image (${id}).png`;
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
                            />
                        </div>
                    ))
                ) : (
                    <p>Aucun Pokémon n'a été trouvé. Attrape-les dans le booster !</p>
                )}


            </div>
        </div>
    );
};

export default Pokedex;
