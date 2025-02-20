import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
const Booster = () => {
  const urlImage = "src/assets/EB05-Booster.png";
  const navigate = useNavigate();
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useTransform(cardY, [-300, 300], [10, -10]); // Reversed values
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]); // Reversed values
  const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]); // Adjusted rotation values
  const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]); // Adjusted rotation values
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
  const openBooster = () => {
    navigate(`/opening`);
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ opacity: 0.75 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="booster-closed"
        onClick={() => openBooster()}
        style={{
          perspective: 800,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
              style={{ height: "50vh" }}
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Booster;
