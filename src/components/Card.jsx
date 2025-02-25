import { motion } from "framer-motion";

const Card = ({ rotateX, rotateY, cardRotateX, cardRotateY, cardId }) => {

    const getPokemonImage = (id) => {
        let savedPokemonIds = JSON.parse(localStorage.getItem('pokemonIds')) || [];
        if (!savedPokemonIds.includes(id)) {
            savedPokemonIds.push(id);
            localStorage.setItem('pokemonIds', JSON.stringify(savedPokemonIds));
        }
        return `/assets/pokemons/image (${id}).png`;
    }

    return (
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
                    key={cardId}
                    src={getPokemonImage(cardId)}
                    alt="Pokemon"
                    initial={{ scale: 0.5, opacity: 0, rotate: 30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    whileHover={{ opacity: 0.9, filter: 'brightness(1.2)' }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                        height: "50vh",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                    }}
                />
            </motion.div>
        </motion.div>
    )
}

export default Card;
