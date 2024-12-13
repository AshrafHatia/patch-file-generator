import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import HowToUse from "./Pages/HowToUse";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./css/App.css"; // Import the CSS file

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Apply or remove the dark mode class on the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Header
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-to-use" element={<HowToUse />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
