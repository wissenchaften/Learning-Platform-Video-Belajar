import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import VideoCard from "../../components/VideoCard/VideoCard";
import Toolbar from "../../components/Toolbar/Toolbar";
import SidebarFilter from "../../components/SidebarFilter/SidebarFilter";

import { videoData } from "../../data/courses";

import "./Category.css";

const CategoryPage = () => {
  // 1. Integrasi Local Storage: Ambil data dari storage atau gunakan data default
  const [courses, setCourses] = useState(() => {
    const savedData = localStorage.getItem("myCoursesData");
    return savedData ? JSON.parse(savedData) : videoData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Harga Rendah");

  // State Filter (tetap sama)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedPrices([]);
    setSelectedDuration("");
    setSearchTerm("");
    setSortBy("Harga Rendah");
  };

  // 2. Gunakan 'courses' (dari state) bukan 'videoData' (statis) untuk filter & sort
  const filteredData = courses // Perubahan di sini
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(item.category);
      const matchesPrice =
        selectedPrices.length === 0 ||
        (selectedPrices.includes("Gratis") && item.price === 0) ||
        (selectedPrices.includes("Berbayar") && item.price > 0);

      let matchesDuration = true;
      if (selectedDuration === "Kurang dari 4 Jam")
        matchesDuration = item.duration < 4;
      if (selectedDuration === "4-8 Jam")
        matchesDuration = item.duration >= 4 && item.duration <= 8;
      if (selectedDuration === "Lebih dari 8 Jam")
        matchesDuration = item.duration > 8;

      return (
        matchesSearch && matchesCategory && matchesPrice && matchesDuration
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Harga Rendah":
          return a.price - b.price;
        case "Harga Tinggi":
          return b.price - a.price;
        case "A to Z":
          return a.title.localeCompare(b.title);
        case "Z to A":
          return b.title.localeCompare(a.title);
        case "Rating Tertinggi":
          return b.rating - a.rating;
        case "Rating Terendah":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="category-page">
      <Navbar />
      <main className="category-container">
        <div className="category-content">
          <SidebarFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            onReset={handleReset}
          />

          <section className="course-list-section">
            <Toolbar onSort={setSortBy} onSearch={setSearchTerm} />

            {filteredData.length > 0 ? (
              <div className="video-grid">
                {filteredData.map((item) => (
                  <VideoCard key={item.id} data={item} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Maaf, belum ada video untuk kategori ini.</p>
                <button className="btn-reset-filter" onClick={handleReset}>
                  Hapus Semua Filter
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
