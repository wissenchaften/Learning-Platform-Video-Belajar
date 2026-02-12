import React from "react";
import "./HeroFooter.css";
import "../Button/Button";
import Button from "../Button/Button";
const HeroFooter = () => {
  return (
    <section className="hero2-section">
      <div className="hero2-overlay">
        <div className="hero-content2">
          <span>NEWSLETTER</span>
          <h2>Mau Belajar Lebih Banyak?</h2>
          <p>
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
            spesial dari program-program terbaik hariesok.id
          </p>
          <div className="subscribe-section">
            <input
              type="text"
              className="subscribe-input"
              placeholder="Masukkan Emailmu"
            />
            <Button className="btn-orange">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroFooter;
