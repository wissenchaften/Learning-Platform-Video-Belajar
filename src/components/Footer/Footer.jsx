import React, { useState } from "react";
import "./Footer.css";
import logoImg from "../../assets/logo.png";
import footerIcon1 from "../../assets/icon-linkedin.png";
import footerIcon2 from "../../assets/icon-facebook.png";
import footerIcon3 from "../../assets/icon-twitter.png";
import footerIcon4 from "../../assets/icon-ig.png";

const Footer = () => {
  // State untuk melacak menu mana yang terbuka di mobile
  // Nilai bisa 'kategori', 'perusahaan', 'komunitas', atau null
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    // Jika menu yang diklik sudah terbuka, tutup (null). Jika belum, buka menu tersebut.
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Bagian Kiri: Informasi Kontak */}
        <div className="footer-info">
          <img src={logoImg} alt="logo" className="footer-logo" />
          <h4>Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!</h4>
          <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p>+62-877-7123-1234</p>
        </div>

        {/* Bagian Kanan: Grup Link Navigasi */}
        <div className="footer-links">
          <div
            className={`link-group ${activeMenu === "kategori" ? "active" : ""}`}
          >
            <h5 onClick={() => toggleMenu("kategori")}>Kategori</h5>
            <div className="link-items">
              <p>Digital & Teknologi</p>
              <p>Pemasaran</p>
              <p>Manajemen Bisnis</p>
              <p>Pengembangan Diri</p>
              <p>Desain</p>
            </div>
          </div>

          <div
            className={`link-group ${activeMenu === "perusahaan" ? "active" : ""}`}
          >
            <h5 onClick={() => toggleMenu("perusahaan")}>Perusahaan</h5>
            <div className="link-items">
              <p>Tentang Kami</p>
              <p>FAQ</p>
              <p>Kebijakan Privasi</p>
              <p>Ketentuan Layanan</p>
              <p>Bantuan</p>
            </div>
          </div>

          <div
            className={`link-group ${activeMenu === "komunitas" ? "active" : ""}`}
          >
            <h5 onClick={() => toggleMenu("komunitas")}>Komunitas</h5>
            <div className="link-items">
              <p>Tips Sukses</p>
              <p>Blog</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>©2023 Gerobak Sayur All Rights Reserved.</p>
        </div>

        <div className="social-icons">
          <img src={footerIcon1} alt="LinkedIn" />
          <img src={footerIcon2} alt="Facebook" />
          <img src={footerIcon3} alt="Twitter" />
          <img src={footerIcon4} alt="Instagram" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
