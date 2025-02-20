import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BoosterCarousel from "./components/BoosterCarousel";
import BoosterDetail from "./components/Booster";
import BoosterOpening from "./components/BoosterOpening";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.jsx</code> and save to test HMR
              </p>
            </div>
          }
        />
        <Route path="/carrousel" element={<BoosterCarousel />} />
        <Route path="/booster" element={<BoosterDetail />} />
        <Route path="/opening" element={<BoosterOpening />} />
      </Routes>
    </Router>
  );
}

export default App;
