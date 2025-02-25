import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Booster = () => {
  const urlImage = "/assets/EB05-Booster.png";
  const navigate = useNavigate();
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
  const openBooster = () => {
    navigate(`/opening`);
  };

  return (
    <div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        onClick={() => openBooster()}
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
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
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
              style={{ height: "50vh", borderRadius: "8px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px" }}
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
            <p style={{ fontWeight: "bold" }}>Tap to open the booster.</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Booster;
