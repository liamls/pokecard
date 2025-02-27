import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Booster = () => {
  const urlImage = "/assets/EB05-Booster.png";
  const navigate = useNavigate();

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
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            margin: "auto",
            transformStyle: "preserve-3d",
            perspective: 800,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          transition={{ velocity: 0 }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              perspective: 800,
              width: "100%",
              height: "100%",
            }}
            transition={{ velocity: 0 }}
          >
            <motion.img
              style={{
                height: "50vh",
                borderRadius: "8px",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
              src={urlImage}
              animate={{
                rotateX: [-1, 1],
                rotateY: [1, -1],
                scale: [0.8, 1],
                opacity: [1, 0.9],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
            <p style={{ fontWeight: "bold", color: "white" }}>
              Tap to open the booster.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Booster;
