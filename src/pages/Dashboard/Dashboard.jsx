import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import VideoCard from "../../components/VideoCard/VideoCard";
import HeroFooter from "../../components/HeroFooter/HeroFooter";
import Footer from "../../components/Footer/Footer";
import useCourseStore from "../../store/useCourseStore";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  // Ambil data, fungsi fetch, dan loading state dari Zustand
  const { courses, fetchCourses, loading } = useCourseStore();

  useEffect(() => {
    // Proteksi Route: Cek login
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (!loggedIn) {
      navigate("/login");
    }

    // Panggil API melalui Zustand saat komponen dimuat
    fetchCourses();
  }, [navigate, fetchCourses]);

  const categories = [
    "Semua Kelas",
    "Pemasaran",
    "Desain",
    "Digital & Teknologi",
    "Pengembangan Diri",
    "Bisnis Manajemen",
  ];

  // Logika filter menggunakan data 'courses' dari store
  const filteredVideos =
    activeCategory === "Semua Kelas"
      ? courses
      : courses.filter((video) => video.category === activeCategory);

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

        {/* Handling Loading State */}
        {loading ? (
          <div className="loading-state">
            <p>Memuat video pembelajaran terbaru...</p>
          </div>
        ) : (
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
        )}

        <HeroFooter />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
