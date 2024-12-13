// Footer.js
import React from "react";
import "../css/Footer.css";

function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p>Ashraf Hatia</p>
          <div className="social-links">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/icons/twitterx.svg" alt="Twitter" />
            </a>
            <a href="https://www.linkedin.com/in/ashrafhatia/" target="_blank" rel="noopener noreferrer">
              <img src="/icons/linkedin.svg" alt="LinkedIn" />
            </a>
            <a href="https://github.com/AshrafHatia" target="_blank" rel="noopener noreferrer">
              <img src="/icons/github.svg" alt="GitHub" />
            </a>
          </div>
          <p>© {new Date().getFullYear()} Patchify. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
  
export default Footer;