import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoosterCarousel from "./components/BoosterCarousel";
import BoosterDetail from "./components/Booster";
import BoosterOpening from "./components/BoosterOpening";
import Pokedex from "./components/Pokedex";

function App() {
  const navStyle = {
    display: 'flex',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '5rem',
    fontWeight: 'bold',
    margin: "4rem"
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div style={navStyle}>
              <a href="/carrousel" style={navLinkStyle} >
                Boosters
              </a>
              <a href="/pokedex" style={navLinkStyle} >
                Pokédex
              </a>
            </div>
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
