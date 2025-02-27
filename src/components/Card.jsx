import { motion } from "framer-motion";

const Card = ({ cardId }) => {
  const getPokemonImage = (id) => `/assets/pokemons/${id}.png`;

  return (
    <motion.div
      style={{
        margin: "auto",
        transformStyle: "preserve-3d",
        perspective: 800,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      animate={{
        rotateX: [-5, 5],
        rotateY: [5, -5],
        scale: [0.85, 0.9],
        filter: ["brightness(1)", "brightness(1.1)"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <motion.img
        key={cardId}
        src={getPokemonImage(cardId)}
        alt="Pokemon"
        initial={{ scale: 0.2, opacity: 0, rotate: 45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        whileHover={{ opacity: 0.9, filter: "brightness(1.2)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          height: "50vh",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: "10px",
        }}
      />
    </motion.div>
  );
};

export default Card;
