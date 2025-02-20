import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Booster = () => {
  const urlImage = "src/assets/EB05-Booster.png";
  const navigate = useNavigate();

  const openBooster = () => {
    navigate(`/opening`);
  };

  return (
    <div className="booster-detail-container">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ opacity: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="booster-closed"
        onClick={() => openBooster()}
      >
        <motion.img
          src={urlImage}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Booster;
