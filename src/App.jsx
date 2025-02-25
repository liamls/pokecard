import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";
import BoosterCarousel from "./components/BoosterCarousel";
import BoosterDetail from "./components/Booster";
import BoosterOpening from "./components/BoosterOpening";
import Pokedex from "./components/Pokedex";

function App() {
  useEffect(() => {
    document.title = "Pokemon Unlimited";
  }, []);

  const navStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',

  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '2px solid #fff',
    transition: 'background 0.3s, color 0.3s, transform 0.3s',
  };

  const descriptionStyle = {
    color: '#fff',
    fontSize: '1.2rem',
    marginTop: '2rem',
    maxWidth: '600px',
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={navStyle}
            >
              <motion.a
                href="/carrousel"
                style={navLinkStyle}
              >
                Boosters
              </motion.a>
              <motion.a
                href="/pokedex"
                style={navLinkStyle}
              >
                Pokedex
              </motion.a>
              <p style={descriptionStyle}>
                This is a Pokémon card opening simulator made by Liam Le Strat.
              </p>
            </motion.div>
          }
        />
        <Route path="/carrousel" element={<BoosterCarousel />} />
        <Route path="/booster" element={<BoosterDetail />} />
        <Route path="/opening" element={<BoosterOpening />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </Router>
  );
}

export default App;
