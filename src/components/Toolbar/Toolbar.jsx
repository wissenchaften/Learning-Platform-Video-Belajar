import React from "react";
import "./Toolbar.css";

const Toolbar = ({ onSort, onSearch }) => {
  return (
    <div className="toolbar-container">
      <div className="sort-group">
        <div className="select-wrapper">
          <select id="sort-select" onChange={(e) => onSort(e.target.value)}>
            <option value="" disabled selected hidden>
              Urutkan
            </option>
            <option value="Harga Rendah">Harga Rendah</option>
            <option value="Harga Tinggi">Harga Tinggi</option>
            <option value="A to Z">A to Z</option>
            <option value="Z to A">Z to A</option>
            <option value="Rating Tertinggi">Rating Tertinggi</option>
            <option value="Rating Terendah">Rating Terendah</option>
          </select>
          <span className="chevron-icon">▼</span>
        </div>
      </div>

      {/* Bagian Cari */}
      <div className="search-group">
        <input
          type="text"
          placeholder="Cari Kelas"
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>
    </div>
  );
};

export default Toolbar;
