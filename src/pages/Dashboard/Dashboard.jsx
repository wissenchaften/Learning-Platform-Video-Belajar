import React, { useState, useEffect } from "react"; // 1. Tambahkan useEffect di sini
import { useNavigate } from "react-router-dom"; // 2. Tambahkan useNavigate di sini
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import VideoCard from "../../components/VideoCard/VideoCard";
import HeroFooter from "../../components/HeroFooter/HeroFooter";
import Footer from "../../components/Footer/Footer";
import "./Dashboard.css";
import { videoData } from "../../data/courses";

// Data unik bisa diletakkan di luar agar tidak dihitung ulang setiap render
const uniqueVideoData = Array.from(
  new Map(videoData.map((item) => [item.id, item])).values(),
);

const Dashboard = () => {
  const navigate = useNavigate(); // 3. Inisialisasi navigate di dalam komponen
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  // 4. Pindahkan useEffect ke DALAM komponen
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const categories = [
    "Semua Kelas",
    "Pemasaran",
    "Desain",
    "Digital & Teknologi",
    "Pengembangan Diri",
    "Bisnis Manajemen",
  ];

  const filteredVideos =
    activeCategory === "Semua Kelas"
      ? uniqueVideoData
      : uniqueVideoData.filter((video) => video.category === activeCategory);

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-container">
        <Hero />

        <section className="section-header">
          <h2>Koleksi Video Pembelajaran Unggulan</h2>
        </section>

        <div className="category-tabs">
          {categories.map((cat) => (
            <span
              key={cat}
              className={`tab ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="video-grid">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((item) => (
              <VideoCard key={item.id} data={item} />
            ))
          ) : (
            <div className="empty-state">
              <p>Maaf, belum ada video untuk kategori ini.</p>
            </div>
          )}
        </div>
        <HeroFooter />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
