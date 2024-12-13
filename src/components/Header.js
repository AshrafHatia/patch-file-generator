// Header.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router
import "../css/Header.css";

function Header({ toggleDarkMode, isDarkMode }) {
    return (
      <header className="header">
        <a href="/" className="logo">Patchify</a>
        <nav className="nav-menu">
          <ul>
            <Link to="/" style={{ margin: "0 10px", color: "#61dafb", textDecoration: "none" }}>Home</Link>
            <Link to="/about" style={{ margin: "0 10px", color: "#61dafb", textDecoration: "none" }}>About</Link>
            <Link to="/how-to-use" style={{ margin: "0 10px", color: "#61dafb", textDecoration: "none" }}>How to Use</Link>
            </ul>
        </nav>
        <div className="header-actions">
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <button className="cta-button">Get Started</button>
        </div>
      </header>
    );
  }
  
  export default Header;